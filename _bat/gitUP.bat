ECHO OFF
CALL git add .
ECHO .
CALL git commit -m "Update Files"
ECHO .
CALL git push
ECHO .
ECHO "Repositorio guardado."
PAUSE