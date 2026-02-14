# Academia Técnica: Joaquín Sorolla
## El Maestro de la Luz

Una aplicación educativa sobre la técnica pictórica del maestro valenciano Joaquín Sorolla (1863-1923).

---

## 🚀 Instalación

### Requisitos previos
- Node.js versión 18 o superior
- npm (incluido con Node.js)

### Pasos de instalación

1. **Abre la terminal** en la carpeta SOROLLA

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación:**
   ```bash
   npm start
   ```

---

## 📦 Crear instaladores para distribución

### Para Windows:
```bash
npm run build:win
```
Genera un instalador `.exe` en la carpeta `dist/`

### Para macOS:
```bash
npm run build:mac
```
Genera un archivo `.dmg` en la carpeta `dist/`

### Para Linux:
```bash
npm run build:linux
```
Genera un archivo `.AppImage` en la carpeta `dist/`

---

## 📚 Contenido de la aplicación

### Módulos incluidos:

1. **🎨 La Paleta del Maestro**
   - Pigmentos históricos con códigos hex
   - Niveles de toxicidad
   - El secreto del violeta de manganeso

2. **🖌️ Técnica Pictórica**
   - El secreto de los pinceles largos
   - Proceso de capas
   - Pintura plein air extrema

3. **🖼️ Análisis de Obras**
   - El baño del caballo
   - Trata de blancas
   - El balandrito
   - ¡Triste herencia!

4. **☀️ Capturar la Luz**
   - Influencia de la fotografía
   - Conceptos poéticos-técnicos
   - Claroscuro y planos recortados

5. **📈 Evolución Artística**
   - Línea temporal completa (1863-1919)
   - Evolución de la paleta
   - Hitos internacionales

---

## 🎨 Próximos módulos (en desarrollo)

- John Singer Sargent
- Anders Zorn
- Velázquez

---

## 📁 Estructura del proyecto

```
SOROLLA/
├── main.js           # Proceso principal de Electron
├── preload.js        # Scripts de precarga
├── package.json      # Configuración del proyecto
├── src/
│   └── index.html    # Aplicación principal
├── assets/
│   └── (iconos)      # Añadir icon.png, icon.ico, icon.icns
└── dist/             # Instaladores generados
```

---

## 🖼️ Añadir icono personalizado

Para personalizar el icono de la aplicación:

1. Crea un icono de 512x512 píxeles
2. Guárdalo como:
   - `assets/icon.png` (Linux y referencia)
   - `assets/icon.ico` (Windows)
   - `assets/icon.icns` (macOS)

---

## 💡 Consejos de uso

- Usa el menú **Módulos** para navegar rápidamente
- Haz clic en las obras para ver los secretos técnicos
- Explora las categorías de pigmentos para ver códigos hex exactos

---

## 📄 Licencia

© 2026 Myriam Alcaraz
www.myriamalcaraz.com

---

## 🔧 Soporte

Para soporte o sugerencias, contacta a través de:
- Web: myriamalcaraz.com
