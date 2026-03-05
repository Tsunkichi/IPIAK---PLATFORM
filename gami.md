# IPIAK — Sistema de Ejercicios Lingüísticos Autogenerados
## Briefing completo para agente de Antigravity

---

## Qué es IPIAK

Plataforma web de minilecciones interactivas para aprender lenguas indígenas amazónicas (shuar, kichwa, waorani). El sitio live es **micro.ipiak.com**, construido en HTML/JS/CSS puro con Tailwind CDN. Sin framework, sin build step — archivos estáticos desplegados en Netlify.

**Repo GitHub:** `https://github.com/Tsunkichi/IPIAK---PLATFORM`
**Netlify proyecto:** `microlearning-ip` → `https://micro.ipiak.com`

---

## El objetivo de este proyecto

Construir un pipeline que:

1. El operador sube documentos lingüísticos (PDFs, textos) a Google Drive
2. n8n detecta los archivos nuevos automáticamente
3. Gemini lee cada documento y **decide autónomamente** qué ejercicios educativos crear
4. Los ejercicios se guardan en Supabase
5. micro.ipiak.com los consume y muestra como sección viva con flashcards, minijuegos y ejercicios interactivos

**El operador no decide qué crear — Gemini analiza el documento y elige el formato más apropiado para cada fragmento lingüístico que encuentre.**

---

## Infraestructura existente

### Supabase — proyecto `N8N IPIAK`
- **Project ID:** `ftjsycxqhgqxuerispud`
- **URL:** `https://ftjsycxqhgqxuerispud.supabase.co`
- **Anon key (lectura pública):**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0anN5Y3hxaGdxeHVlcmlzcHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTY3NzAsImV4cCI6MjA4ODE3Mjc3MH0.RufdQk3H77nDZjykmYUvU1FHEcmdhJmRzvZgV03Flec
  ```
- **Service role key:** obtenerla en Supabase Dashboard → Settings → API (necesaria para escritura desde n8n)
- Tabla `resources` ya existe (scraper anterior, no relacionada con este proyecto)
- **Las tablas `documents` y `exercises` deben crearse** (SQL abajo)

### n8n — self-hosted
- Workflow anterior de scraper existe pero es independiente y puede ignorarse
- Hay que crear un workflow nuevo para este pipeline

### Google Drive
- Carpeta a crear: `IPIAK/fuentes`
- Ahí se subirán los documentos a procesar
- n8n accede via Google Drive node (OAuth ya disponible en n8n)

### Gemini
- API key disponible (el operador la tiene)
- Usar modelo: **`gemini-1.5-pro`** — no Flash, Pro tiene ventana de contexto larga necesaria para PDFs completos
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent`

---

## Tablas a crear en Supabase

```sql
-- Registro de documentos procesados
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  drive_file_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'error')),
  exercises_generated INT DEFAULT 0,
  error_message TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ejercicios generados por Gemini
CREATE TABLE exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('flashcard', 'fill_blank', 'word_order', 'multiple_choice', 'cultural_card')),
  language TEXT NOT NULL CHECK (language IN ('kichwa', 'shuar', 'general', 'otro')),
  difficulty TEXT DEFAULT 'basic' CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
  title TEXT,
  content JSONB NOT NULL,
  source_document TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_exercises_type ON exercises(type);
CREATE INDEX idx_exercises_language ON exercises(language);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_active ON exercises(active);
CREATE INDEX idx_documents_status ON documents(status);

-- RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Solo service role escribe exercises" ON exercises FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Solo service role escribe documents" ON documents FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Solo service role actualiza documents" ON documents FOR UPDATE USING (auth.role() = 'service_role');
```

---

## Estructura del campo `content` JSONB por tipo

Cada tipo de ejercicio tiene su propia estructura. Gemini debe respetar estos schemas:

```json
// flashcard
{
  "front": "Imaynalla kashkanki",
  "back": "¿Cómo estás?",
  "pronunciation": "ee-may-NAH-yah kash-KAN-kee",
  "example": "Imaynalla kashkanki, tayta?"
}

// fill_blank
{
  "sentence": "Imaynalla _____, tayta",
  "answer": "kashkanki",
  "options": ["kashkanki", "shamuni", "rinimi", "mikuni"],
  "translation": "¿Cómo estás, señor?"
}

// word_order
{
  "words": ["wi", "penker", "ajutap", "najanin"],
  "correct_order": [0, 2, 3, 1],
  "translation": "Yo hago el trabajo bien"
}

// multiple_choice
{
  "question": "¿Qué significa 'allimi'?",
  "options": ["Bien / Sí", "No", "Quizás", "Mañana"],
  "correct": 0,
  "context": "Se usa como respuesta afirmativa"
}

// cultural_card
{
  "concept": "Pachamama",
  "explanation": "Madre Tierra en la cosmología kichwa...",
  "related_words": ["allpa", "kawsay", "sumak"],
  "cultural_context": "..."
}
```

---

## Workflow n8n — lógica completa

```
[Schedule: cada 2 horas]
         ↓
[Google Drive] → listar archivos en carpeta "IPIAK/fuentes"
         ↓
[HTTP Request → Supabase] → consultar tabla documents
  para filtrar solo archivos con drive_file_id no registrado aún
         ↓
[Loop por archivo nuevo]
         ↓
[Supabase INSERT] → registrar documento con status='processing'
         ↓
[Google Drive] → descargar contenido del archivo
         ↓
[HTTP Request → Gemini 1.5 Pro] → analizar documento
  (ver prompt completo abajo)
         ↓
[Code node] → parsear JSON de respuesta de Gemini
         ↓
[Loop por ejercicio en el array]
         ↓
[HTTP Request → Supabase] → INSERT en exercises
  (con service_role key, Prefer: resolution=ignore-duplicates)
         ↓
[Supabase UPDATE] → marcar documento como status='processed',
  exercises_generated=N, processed_at=NOW()
```

---

## Prompt para Gemini

```
Eres un lingüista y pedagogo especializado en lenguas indígenas amazónicas 
de Ecuador (kichwa, shuar, waorani, achuar).

Analiza el siguiente documento y extrae TODO el contenido lingüísticamente 
valioso. Para cada fragmento útil, decide autónomamente qué tipo de 
ejercicio educativo tiene más sentido crear según el contenido:

- Pares de vocabulario (palabra + traducción) → crea "flashcard"
- Frases con estructura clara → crea "fill_blank" 
- Oraciones completas con gramática visible → crea "word_order"
- Conceptos con múltiples posibles respuestas → crea "multiple_choice"
- Elementos culturales o contextuales → crea "cultural_card"

Reglas:
1. Sé generoso: un documento puede y debe producir 20-50 ejercicios
2. Identifica el idioma de cada ejercicio: "kichwa", "shuar", o "general"
3. Asigna dificultad: "basic", "intermediate", o "advanced"
4. El campo "content" debe seguir exactamente el schema del tipo elegido
5. Responde ÚNICAMENTE con un array JSON válido, sin markdown, sin texto extra

Schema de cada ejercicio:
{
  "type": "flashcard|fill_blank|word_order|multiple_choice|cultural_card",
  "language": "kichwa|shuar|general",
  "difficulty": "basic|intermediate|advanced",
  "title": "título corto descriptivo",
  "content": { ...según tipo... }
}

DOCUMENTO A ANALIZAR:
[contenido del documento]
```

---

## Frontend — sección en micro.ipiak.com

### Dónde va
Nueva sección en `index.html` con id `#ejercicios`, entre la sección de Lecciones y la sección de Compartir. Enlace en el nav: "Ejercicios".

### Stack
HTML/JS/CSS puro + Tailwind CDN (ya cargado en el sitio). Sin React, sin dependencias adicionales. El sitio ya usa:
- Colores: `primary: #C05746`, `shuar-sand: #EBE5DF`, `earth-brown: #8C7B75`
- Fuentes: Playfair Display (serif), Lato (sans)
- Patrón de diseño: cards con `border border-shuar-sand rounded-xl bg-white`

### Componentes a construir (uno por tipo de ejercicio)

**Flashcard** — tarjeta con flip al hacer clic. Frente: palabra en lengua indígena. Reverso: traducción + pronunciación + ejemplo.

**Fill blank** — frase con hueco, 4 opciones como botones. Feedback inmediato (verde/rojo). Muestra traducción al responder.

**Word order** — palabras como chips arrastrables o clicables para ordenar. Valida al presionar "Comprobar".

**Multiple choice** — pregunta + 4 opciones. Feedback inmediato + contexto al responder.

**Cultural card** — tarjeta informativa sin interacción, solo lectura. Muestra concepto, explicación y palabras relacionadas.

### Filtros de la sección
- Por idioma: Kichwa / Shuar / Todos
- Por tipo: Flashcard / Ejercicio / Cultura
- Por dificultad: Básico / Intermedio / Avanzado
- Botón "Aleatorio" que carga un ejercicio random

### Consumo de Supabase
```javascript
// Ejemplo de fetch
fetch('https://ftjsycxqhgqxuerispud.supabase.co/rest/v1/exercises?active=eq.true&order=created_at.desc', {
  headers: {
    'apikey': 'ANON_KEY',
    'Authorization': 'Bearer ANON_KEY'
  }
})
```

---

## i18n

El sitio tiene sistema i18n propio en `shared.js` con diccionarios ES/EN. Todas las claves nuevas deben agregarse a ambos idiomas en el objeto `I18N` de `shared.js`.

Claves nuevas necesarias:
```javascript
// ES
nav_exercises: "Ejercicios",
exercises_title: "Ejercicios Interactivos",
exercises_subtitle: "Practica kichwa y shuar con ejercicios generados a partir de material lingüístico auténtico.",
ex_filter_all: "Todos",
ex_filter_flashcard: "Flashcards",
ex_filter_exercise: "Ejercicios",
ex_filter_culture: "Cultura",
ex_btn_flip: "Ver respuesta",
ex_btn_check: "Comprobar",
ex_btn_random: "Ejercicio aleatorio",
ex_correct: "¡Correcto!",
ex_incorrect: "Incorrecto",
ex_empty: "No hay ejercicios disponibles aún.",

// EN (traducir equivalentes)
```

---

## Orden de trabajo recomendado

1. **Crear tablas en Supabase** — ejecutar el SQL de arriba
2. **Construir workflow en n8n** — trigger + Drive + Gemini + Supabase
3. **Probar con un documento real** — subir un PDF a Drive y verificar que llegan ejercicios a Supabase
4. **Construir la sección frontend** — modificar `index.html` y `shared.js`
5. **Deployar a Netlify** — reemplazar archivos y subir via drag & drop o conectar GitHub

---

## Lo que NO hay que construir

- Sistema de autenticación de usuarios
- Panel de administración
- Sistema de progreso/puntuación de usuarios (puede venir después)
- El scraper de recursos externos (workflow anterior, diferente objetivo)

---

## Contacto y acceso

- Supabase: acceso via MCP disponible (project ID: `ftjsycxqhgqxuerispud`)
- Netlify: acceso via MCP disponible (site ID: `ee309b21-1fb2-478d-99ca-63878d48f7e2`)
- n8n: self-hosted, el operador configura credenciales directamente
- GitHub: `https://github.com/Tsunkichi/IPIAK---PLATFORM` (público)
- Gemini API key: el operador la provee al configurar n8n