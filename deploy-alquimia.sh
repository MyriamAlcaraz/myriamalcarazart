#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  deploy-alquimia.sh
#  Sincroniza public/alquimia → dist/alquimia y publica en main.
#  Solo toca la carpeta Alquimia. El resto de la web no cambia.
#  Uso: ./deploy-alquimia.sh "mensaje de commit opcional"
# ─────────────────────────────────────────────────────────────

set -e  # Detener si cualquier comando falla

SRC="public/alquimia"
DST="dist/alquimia"
MSG="${1:-Actualizar Alquimia}"

echo ""
echo "▶  Copiando $SRC → $DST ..."
rm -rf "$DST"
cp -r "$SRC" "$DST"

# Eliminar .DS_Store para no ensuciar el repo
find "$DST" -name ".DS_Store" -delete 2>/dev/null || true

echo "▶  Añadiendo archivos al staging ..."
git add -f "$DST"

# Solo hacer commit si hay cambios reales
if git diff --cached --quiet; then
    echo "✓  Sin cambios nuevos en Alquimia. Nada que publicar."
else
    git commit -m "$MSG"
    echo "▶  Publicando en origin/main ..."
    git push origin main
    echo ""
    echo "✓  Alquimia publicada correctamente."
    echo "   URL: https://myriamalcaraz.com/alquimia/alquimia-ia.html"
fi
echo ""
