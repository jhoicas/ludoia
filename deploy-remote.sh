#!/bin/bash
# Deploy Ludoia en el Droplet de DigitalOcean
# Uso: ./deploy-remote.sh
# Configura SERVER y APP_DIR según tu entorno

set -e

SERVER="${DEPLOY_SERVER:-root@TU_IP_DROPLET}"
APP_DIR="${DEPLOY_APP_DIR:-/var/www/ludoia}"

echo "Desplegando en $SERVER..."
ssh "$SERVER" "cd $APP_DIR && git pull && npm ci && npm run build && pm2 restart ludoia"
echo "Listo. Revisa https://ludoia.com"
