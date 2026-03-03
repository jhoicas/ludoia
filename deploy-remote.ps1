# Deploy Ludoia en el Droplet de DigitalOcean (PowerShell)
# Uso: .\deploy-remote.ps1
# Configura $Server y $AppDir según tu entorno, o usa variables de entorno:
#   $env:DEPLOY_SERVER = "root@TU_IP"
#   $env:DEPLOY_APP_DIR = "/var/www/ludoia"

$ErrorActionPreference = "Stop"
$Server = if ($env:DEPLOY_SERVER) { $env:DEPLOY_SERVER } else { "root@TU_IP_DROPLET" }
$AppDir = if ($env:DEPLOY_APP_DIR) { $env:DEPLOY_APP_DIR } else { "/var/www/ludoia" }

Write-Host "Desplegando en $Server ..."
ssh $Server "cd $AppDir && git pull && npm ci && npm run build && pm2 restart ludoia"
Write-Host "Listo. Revisa https://ludoia.com"
