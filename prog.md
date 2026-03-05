# IPIAK Platform — Handoff para agente / IDE

## Contexto del proyecto

**IPIAK** es una plataforma de minilecciones interactivas para aprender lenguas indígenas amazónicas (shuar, kichwa, waorani). El sitio live es **micro.ipiak.com**, desplegado en Netlify bajo el proyecto `microlearning-ip`.

El objetivo de esta sesión fue construir un pipeline automatizado que:
1. Busque recursos lingüísticos en la web (artículos académicos, vocabulario, noticias)
2. Los procese con Gemini para evaluar relevancia
3. Los guarde en Supabase
4. Los muestre dinámicamente en micro.ipiak.com como una biblioteca/directorio pública

---

## Estado actual — qué existe y qué no

### ✅ Supabase — CREADO, listo para usar

- **Proyecto:** `N8N IPIAK`
- **Project ID:** `ftjsycxqhgqxuerispud`
- **URL:** `https://ftjsycxqhgqxuerispud.supabase.co`
- **Anon key:**
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0anN5Y3hxaGdxeHVlcmlzcHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTY3NzAsImV4cCI6MjA4ODE3Mjc3MH0.RufdQk3H77nDZjykmYUvU1FHEcmdhJmRzvZgV03Flec
  ```
- **Tabla `resources` ya migrada** con esta estructura:

```sql
CREATE TABLE resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,               -- deduplicación automática
  source_type TEXT CHECK (source_type IN ('academic', 'vocabulary', 'news', 'multimedia', 'other')),
  language TEXT CHECK (language IN ('kichwa', 'shuar', 'general', 'otro')),
  summary TEXT,
  relevance_score INT CHECK (relevance_score BETWEEN 1 AND 10),
  tags TEXT[],
  display_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

- RLS habilitado: lectura pública, escritura solo con `service_role`
- Índices en `language`, `source_type`, `relevance_score`, `created_at`
- Trigger `updated_at` automático
- **La tabla está vacía** — el scraper aún no ha corrido

> ⚠️ Necesitas la **service_role key** (no la anon key) para que n8n pueda insertar. Encuéntrala en Supabase Dashboard → Settings → API → `service_role secret`.

---

### ✅ n8n — workflow IMPORTADO, pendiente de configurar

El workflow `IPIAK – Scraper de Recursos Lingüísticos` fue importado manualmente desde JSON. Corre cada 3 días.

**Flujo:**
```
Schedule (cada 3 días)
  → Definir 8 queries de búsqueda
  → Loop por query
  → Google Custom Search API (5 resultados por query)
  → Filtrar dominios basura (Pinterest, FB, IG, etc.)
  → Gemini 1.5 Flash → analiza relevancia, genera summary, tags, language
  → Filtrar relevance_score >= 7
  → POST a Supabase /rest/v1/resources (con Prefer: resolution=ignore-duplicates)
  → Log final
```

**Placeholders que FALTAN configurar en el workflow:**

| Nodo | Campo | Valor a poner |
|------|-------|---------------|
| Google Custom Search | `key` | Tu Google API Key (console.cloud.google.com) |
| Google Custom Search | `cx` | Tu Search Engine ID (programmablesearchengine.google.com) |
| Gemini – Analizar | `key` (query param) | Tu Gemini API Key (aistudio.google.com) |
| Guardar en Supabase | `apikey` header | **service_role key** de Supabase (no la anon) |
| Guardar en Supabase | `Authorization` header | `Bearer <service_role key>` |

> La URL de Supabase ya está correcta en el workflow: `https://ftjsycxqhgqxuerispud.supabase.co/rest/v1/resources`

**Queries configuradas en el workflow:**
- `kichwa language linguistics research` (academic/kichwa)
- `shuar language linguistics Ecuador` (academic/shuar)
- `lengua kichwa vocabulario frases recursos libres` (vocabulary/kichwa)
- `kichwa quechua open educational resources OER free` (vocabulary/kichwa)
- `pueblos amazónicos Ecuador noticias 2025` (news/general)
- `indigenous amazonian languages preservation Ecuador 2025` (academic/general)
- `shuar achuar language learning free resources` (vocabulary/shuar)
- `kichwa grammar dictionary PDF free download` (academic/kichwa)

---

### ✅ GitHub — repo subido, sin cambios desplegados

- **Repo:** `https://github.com/Tsunkichi/IPIAK---PLATFORM`
- **Branch:** `main`
- **Estructura:**
  ```
  index.html          ← página principal (NO modificada aún)
  about.html
  shared.js           ← i18n, catálogo de lenguas, lógica compartida (NO modificado aún)
  lecciones.js        ← datos de lecciones Shuar
  update_lessons.js
  shared.js
  logo.png
  lecciones/          ← carpeta con lecciones individuales
  propuesta
  ```
- **Stack:** HTML/JS/CSS puro + Tailwind CDN + Google Fonts
- **Sin build step** — archivos estáticos directos

---

### ⏳ Netlify — sin cambios desplegados

- **Sitio:** `microlearning-ip` → `https://micro.ipiak.com`
- **Site ID:** `ee309b21-1fb2-478d-99ca-63878d48f7e2`
- **Deploy actual:** manual (drag & drop), sin CI/CD conectado a GitHub
- **micro.ipiak.com está igual que antes** — ningún cambio llegó a producción

---

### 📄 Archivos generados en esta sesión (pendientes de integrar)

Estos dos archivos están listos y son los únicos que hay que modificar en el repo:

#### `index.html` — cambios respecto al original:
1. Nuevo enlace "Recursos" en nav desktop y mobile → `#recursos`
2. Enlace "Recursos" en footer
3. **Sección nueva `#recursos`** entre la sección de Lecciones y la sección de Share:
   - Título/subtítulo con i18n (`data-i18n`)
   - Filtros por idioma (Kichwa, Shuar) y tipo (Académico, Vocabulario, Noticias)
   - Input de búsqueda en tiempo real
   - Grid 3 columnas responsive con cards
   - Paginación (9 recursos por página)
   - Toda la lógica de fetch a Supabase en JS vanilla inline
   - Estilos CSS inline (animaciones fade-in, spinner, hover cards)

#### `shared.js` — cambios respecto al original:
- Claves i18n nuevas en ES y EN:
  - `nav_resources`, `resources_title`, `resources_subtitle`
  - `rec_filter_all/academic/vocabulary/news`
  - `rec_count_label`, `rec_count_found`, `rec_empty`, `rec_view`

---

## Lo que falta para que todo funcione

### Orden recomendado:

**1. Completar credenciales en n8n**
   - Google Custom Search: API key + Search Engine ID
   - Gemini API key
   - Supabase service_role key en el nodo "Guardar en Supabase"
   - Ejecutar el workflow manualmente una vez para verificar que llegan datos a Supabase

**2. Verificar datos en Supabase**
   - Ir a `https://supabase.com/dashboard/project/ftjsycxqhgqxuerispud/editor`
   - Confirmar que la tabla `resources` tiene registros
   - Sin datos en Supabase, la sección del sitio mostrará vacío

**3. Integrar los archivos modificados al repo**
   - Reemplazar `index.html` y `shared.js` en el repo de GitHub con los archivos generados
   - Revisar que la sección de recursos se vea bien localmente antes de deployar

**4. Deployar a Netlify**
   - Opción A: drag & drop de la carpeta completa en Netlify dashboard
   - Opción B (recomendado): conectar el repo de GitHub a Netlify para CI/CD automático en push a main

**5. Opcional — conectar GitHub a Netlify para CI/CD**
   - En Netlify: `microlearning-ip` → Site configuration → Build & deploy → Link repository
   - Branch: `main`, Build command: (ninguno, es estático), Publish directory: `.` (raíz)

---

## Cómo consume el sitio los datos de Supabase

El `index.html` hace un fetch directo al endpoint REST de Supabase:

```javascript
fetch('https://ftjsycxqhgqxuerispud.supabase.co/rest/v1/resources?select=*&order=relevance_score.desc,created_at.desc', {
  headers: {
    'apikey': '<anon_key>',
    'Authorization': 'Bearer <anon_key>'
  }
})
```

- Usa la **anon key** (lectura pública, seguro)
- RLS garantiza que nadie puede escribir ni borrar desde el frontend
- La sección se actualiza sola cada vez que n8n corre y agrega recursos nuevos

---

## Objetivo final

Una sección `/recursos` en micro.ipiak.com que funcione como biblioteca pública de referencias lingüísticas sobre lenguas amazónicas, alimentada automáticamente cada 3 días por el scraper de n8n, sin intervención manual. Los recursos son gratuitos y apuntan a fuentes externas (no se hostea contenido propio).