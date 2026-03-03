# Desplegar Ludoia en DigitalOcean (ludoia.com)

Guía para conectar tu proyecto a un Droplet en DigitalOcean y servir la página en **ludoia.com**.

---

## 1. Requisitos previos

- Un **Droplet** en DigitalOcean (Ubuntu 22.04 recomendado).
- El **dominio ludoia.com** (registrado en cualquier proveedor).
- Tu proyecto en **Git** (GitHub, GitLab o Bitbucket) para que el servidor pueda clonar.

---

## 2. Configurar el dominio ludoia.com

En el panel de tu registrador de dominio (Donweb, GoDaddy, Namecheap, etc.):

1. Crea un **registro A**:
   - **Nombre/Host:** `@` (o vacío, para la raíz del dominio).
   - **Apunta a / Valor:** la **IP pública de tu Droplet** (ej: `164.92.xxx.xxx`).
   - **TTL:** 300 o por defecto.

2. Opcional — para **www.ludoia.com**:
   - Otro registro **A** o **CNAME**:
   - **Nombre:** `www`
   - **Apunta a:** la misma IP del Droplet (o `ludoia.com` si usas CNAME).

Los cambios de DNS pueden tardar entre unos minutos y 48 horas.

---

## 3. Preparar el Droplet (primera vez)

Conéctate por SSH (reemplaza `TU_IP` por la IP de tu Droplet y `root` si usas otro usuario):

```bash
ssh root@TU_IP
```

### 3.1 Actualizar e instalar Node.js

```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # debe mostrar v20.x
```

### 3.2 Instalar Nginx (reverse proxy) y Certbot (SSL)

```bash
apt install -y nginx certbot python3-certbot-nginx
```

### 3.3 Crear usuario para la app (recomendado)

```bash
adduser ludoia
usermod -aG sudo ludoia
su - ludoia
```

El resto de comandos en el servidor pueden ser como `ludoia` o como `root`, según prefieras.

### 3.4 Clonar el repositorio

Si tu código está en **GitHub** (o similar), en el servidor:

```bash
# Si es público:
git clone https://github.com/TU_USUARIO/ludoia.git /var/www/ludoia
cd /var/www/ludoia
```

Si el repo es **privado**, configura SSH key o token:

```bash
# Opción A: SSH key (generar en tu PC y añadir la pública a GitHub)
ssh-keygen -t ed25519 -C "ludoia-server" -f ~/.ssh/deploy_ludoia -N ""
cat ~/.ssh/deploy_ludoia.pub
# Añade esta clave en GitHub: Settings → SSH and GPG keys

git clone git@github.com:TU_USUARIO/ludoia.git /var/www/ludoia
```

Para usar `/var/www/ludoia` con un usuario que no sea root:

```bash
sudo mkdir -p /var/www
sudo chown ludoia:ludoia /var/www
# Luego clonar como usuario ludoia en /var/www/ludoia
```

### 3.5 Instalar dependencias y construir

En el servidor, dentro de la carpeta del proyecto:

```bash
cd /var/www/ludoia
npm ci
npm run build
```

Next.js está configurado con `output: 'standalone'`, así que la build generará una carpeta `.next/standalone` con todo lo necesario para ejecutar.

### 3.6 Probar la app en el servidor

```bash
cd /var/www/ludoia
npm start
```

Debería quedar escuchando en el puerto 3000. Prueba desde tu navegador: `http://TU_IP:3000`. Luego detén el proceso (Ctrl+C).

---

## 4. Dejar la app corriendo siempre (PM2)

Instala PM2 y arranca la app:

```bash
npm install -g pm2
cd /var/www/ludoia
pm2 start npm --name "ludoia" -- start
pm2 save
pm2 startup
```

Con `pm2 startup` te dirá un comando (ej: `sudo env PATH=... pm2 startup systemd -u ludoia`). Ejecútalo para que la app se inicie al reiniciar el servidor.

---

## 5. Nginx como reverse proxy

Crea un sitio para ludoia.com:

```bash
sudo nano /etc/nginx/sites-available/ludoia.com
```

Contenido (reemplaza `TU_IP` por tu IP si aún no apunta el dominio):

```nginx
server {
    listen 80;
    server_name ludoia.com www.ludoia.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activa el sitio y recarga Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/ludoia.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Prueba en el navegador: `http://ludoia.com` (cuando el DNS ya apunte a tu Droplet).

---

## 6. Activar HTTPS (SSL) con Let's Encrypt

Cuando `ludoia.com` ya resuelva a la IP del Droplet:

```bash
sudo certbot --nginx -d ludoia.com -d www.ludoia.com
```

Sigue las preguntas (email, aceptar términos). Certbot configurará HTTPS y la renovación automática.

Comprueba: `https://ludoia.com`

---

## 7. Actualizar la página (despliegues futuros)

Cada vez que quieras publicar cambios:

```bash
ssh root@TU_IP   # o ssh ludoia@TU_IP
cd /var/www/ludoia
git pull
npm ci
npm run build
pm2 restart ludoia
```

Puedes automatizar esto con un **script de deploy** (ver más abajo) o con **GitHub Actions**.

---

## 8. Resumen de datos que necesitas

| Dato | Dónde verlo |
|------|-------------|
| **IP del Droplet** | DigitalOcean → Droplets → tu servidor |
| **Usuario SSH** | `root` o el usuario que creaste (ej: `ludoia`) |
| **Dominio** | ludoia.com (registro A apuntando a la IP) |

---

## 9. Script de deploy desde tu PC (opcional)

Desde tu máquina Windows (PowerShell) o con Git Bash puedes crear un script que ejecute los comandos en el servidor. Ejemplo guardado en el repo como referencia:

```bash
# deploy-remote.sh (ejecutar desde tu PC con Git Bash o WSL)
SERVER="root@TU_IP"
APP_DIR="/var/www/ludoia"
ssh $SERVER "cd $APP_DIR && git pull && npm ci && npm run build && pm2 restart ludoia"
```

Reemplaza `TU_IP` por la IP de tu Droplet. Así con un solo comando actualizas la página en ludoia.com.

---

Si quieres, el siguiente paso puede ser: (1) añadir un `deploy.sh` o `deploy.ps1` al repo, o (2) un flujo de **GitHub Actions** que haga el deploy al hacer push a `main`.
