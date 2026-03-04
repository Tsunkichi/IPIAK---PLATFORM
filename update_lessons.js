const fs = require('fs');
const path = require('path');

const LECCIONES_DIR = path.join(__dirname, 'Lecciones');
// Cambiamos la extensión a .js
const OUTPUT_FILE = path.join(__dirname, 'lecciones.js');

// Helper para obtener un título legible desde el nombre de la carpeta
function formatTitle(folderName) {
    // Ejemplo: "chai-winiajai-como-llegar-y-saludar-raw-dAS0KtEX"
    // 1. Quitar sufijos raros como "-raw-..." si existen
    let cleanName = folderName.replace(/-raw-.*$/, '');
    
    // 2. Reemplazar guiones con espacios
    cleanName = cleanName.replace(/-/g, ' ');
    
    // 3. Capitalizar primera letra
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}

function getLessonImage(lessonPath, folderName) {
    try {
        const indexHtmlPath = path.join(lessonPath, 'content', 'index.html');
        // console.log('Checking index path:', indexHtmlPath);
        if (fs.existsSync(indexHtmlPath)) {
            const content = fs.readFileSync(indexHtmlPath, 'utf8');
            // Look for the base64 string inside deserialize("...")
            const match = content.match(/deserialize\("([^"]+)"\)/);
            
            if (match && match[1]) {
                // console.log('Found deserialize match for', folderName);
                const base64Str = match[1];
                const jsonStr = Buffer.from(base64Str, 'base64').toString('utf-8');
                const data = JSON.parse(jsonStr);
                
                // Navigate to the cover image key
                // course -> coverImage -> media -> image -> crushedKey
                if (data.course && 
                    data.course.coverImage && 
                    data.course.coverImage.media && 
                    data.course.coverImage.media.image) {
                    
                    // console.log('Found image data for', folderName);
                    const imageObj = data.course.coverImage.media.image;
                    // Prefer crushedKey, then key (but key needs mapping)
                    const imageName = imageObj.crushedKey || path.basename(imageObj.key);
                    
                    if (imageName) {
                        // Verify if the image exists in assets
                        const imagePath = path.join(lessonPath, 'content', 'assets', imageName);
                        if (fs.existsSync(imagePath)) {
                             // Return relative path for the browser
                            return `Lecciones/${folderName}/content/assets/${imageName}`;
                        } else {
                            console.log('Image file not found at:', imagePath);
                        }
                    }
                } else {
                    console.log('Structure not found in JSON for', folderName);
                }
            } else {
                console.log('No deserialize match for', folderName);
            }
        }
    } catch (e) {
        console.error(`Error extracting image for ${folderName}:`, e.message);
    }
    return null;
}

function scanLessons() {
    console.log('🔍 Escaneando carpeta de lecciones...');
    
    if (!fs.existsSync(LECCIONES_DIR)) {
        console.error('❌ No se encontró la carpeta "Lecciones".');
        return;
    }

    const entries = fs.readdirSync(LECCIONES_DIR, { withFileTypes: true });
    const lessons = [];

    entries.forEach(entry => {
        if (entry.isDirectory()) {
            const folderName = entry.name;
            const fullPath = path.join(LECCIONES_DIR, folderName);
            
            // Verificar si tiene content/index.html
            const indexPath = path.join(fullPath, 'content', 'index.html');
            
            if (fs.existsSync(indexPath)) {
                console.log(`✅ Lección encontrada: ${folderName}`);
                
                const image = getLessonImage(fullPath, folderName);
                
                // Construir objeto de lección
                lessons.push({
                    title: formatTitle(folderName),
                    path: `Lecciones/${folderName}/content/index.html`,
                    folderName: folderName,
                    image: image
                });
            } else {
                console.warn(`⚠️ Carpeta ignorada (sin content/index.html): ${folderName}`);
            }
        }
    });

    // Guardar como archivo JS con variable global
    const jsContent = `window.LESSONS_DATA = ${JSON.stringify(lessons, null, 2)};`;
    
    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf-8');
    console.log(`\n✨ Se han actualizado ${lessons.length} lecciones en ${OUTPUT_FILE}`);
}

scanLessons();