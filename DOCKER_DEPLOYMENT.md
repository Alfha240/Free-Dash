# Docker Deployment Guide for Free Dash

This guide will help you deploy the Free Dash application using Docker on a VPS.

## 📋 Prerequisites

- **VPS/Server** with:
  - Ubuntu 20.04+ / Debian 11+ / CentOS 8+ (or any Linux distribution)
  - Minimum 2GB RAM (4GB+ recommended)
  - Minimum 20GB storage
  - Root or sudo access
- **Domain name** (optional but recommended for production)
- **Pterodactyl Panel** API credentials

## 🚀 Step 1: Server Setup

### 1.1 Update System Packages

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### 1.2 Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

# Add your user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
# Log out and log back in for this to take effect
```

### 1.3 Install Git (if not already installed)

```bash
# Ubuntu/Debian
sudo apt install git -y

# CentOS/RHEL
sudo yum install git -y
```

## 📥 Step 2: Clone and Setup Project

### 2.1 Clone Your Repository

```bash
cd /opt  # or any directory you prefer
git clone <your-repository-url> freedash
cd freedash
```

Or if you're uploading files manually:
```bash
# Upload your project files to /opt/freedash (or your preferred location)
cd /opt/freedash
```

### 2.2 Create Environment File

```bash
# Copy the example environment file
cp .env.example .env

# Edit the environment file
nano .env
```

### 2.3 Configure Environment Variables

Edit `.env` file with your actual values:

```env
# Application URLs (Update with your domain)
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com

# Ports
BACKEND_PORT=3000
FRONTEND_PORT=80

# MongoDB (Use Docker MongoDB or External)
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password_here
MONGO_DATABASE=freedash
MONGODB_URI=mongodb://mongodb:27017/freedash

# Redis
REDIS_PASSWORD=your_secure_redis_password

# JWT Secrets (Generate strong random strings!)
JWT_SECRET=generate-a-very-long-random-string-here
JWT_REFRESH_SECRET=generate-another-very-long-random-string-here

# Pterodactyl Panel (REQUIRED)
PTERODACTYL_URL=https://panel.yourdomain.com
PTERODACTYL_API_KEY=ptla_your_actual_api_key

# Discord OAuth (Optional)
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_CALLBACK_URL=https://api.yourdomain.com/auth/discord/callback
```

**Important Notes:**
- Generate strong JWT secrets: `openssl rand -base64 32`
- Use strong passwords for MongoDB and Redis
- Update URLs to match your actual domain

## 🐳 Step 3: Build and Start Docker Containers

### 3.1 Build Images

```bash
# Build all images
docker-compose build

# Or build specific service
docker-compose build backend
docker-compose build frontend
```

### 3.2 Start Services

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 3.3 Verify Services

```bash
# Check if all containers are running
docker ps

# Check backend health
curl http://localhost:3000

# Check frontend
curl http://localhost
```

## 🌐 Step 4: Configure Reverse Proxy (Nginx)

### 4.1 Install Nginx

```bash
# Ubuntu/Debian
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
```

### 4.2 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/freedash
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:80;
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

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
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

### 4.3 Enable Site and Test

```bash
# Enable site (Ubuntu/Debian)
sudo ln -s /etc/nginx/sites-available/freedash /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## 🔒 Step 5: Setup SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx -y

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx -y
```

### 5.2 Obtain SSL Certificate

```bash
# Get certificate for your domains
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Follow the prompts and Certbot will automatically configure Nginx
```

### 5.3 Auto-renewal (Already configured by Certbot)

```bash
# Test renewal
sudo certbot renew --dry-run
```

## 🔧 Step 6: Update Environment for Production

After setting up SSL, update your `.env` file:

```env
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com
DISCORD_CALLBACK_URL=https://api.yourdomain.com/auth/discord/callback
```

Then rebuild frontend and restart:

```bash
docker-compose build frontend
docker-compose up -d frontend
```

## 📊 Step 7: Monitoring and Maintenance

### 7.1 View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
docker-compose logs -f redis
```

### 7.2 Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### 7.3 Update Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose build
docker-compose up -d
```

### 7.4 Backup Database

```bash
# Create backup
docker exec freedash-mongodb mongodump --out /data/backup --db freedash

# Copy backup from container
docker cp freedash-mongodb:/data/backup ./backup-$(date +%Y%m%d)

# Restore backup
docker exec -i freedash-mongodb mongorestore --db freedash /data/backup/freedash
```

## 🛠️ Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v

# View running containers
docker ps

# Execute command in container
docker exec -it freedash-backend sh
docker exec -it freedash-mongodb mongosh

# View container resource usage
docker stats

# Clean up unused images/containers
docker system prune -a
```

## 🔍 Troubleshooting

### Backend won't start

```bash
# Check logs
docker-compose logs backend

# Check if MongoDB is accessible
docker exec freedash-backend ping mongodb

# Verify environment variables
docker exec freedash-backend env | grep MONGODB_URI
```

### Frontend shows API errors

1. Check `VITE_API_URL` in `.env` matches your backend URL
2. Rebuild frontend: `docker-compose build frontend && docker-compose up -d frontend`
3. Check browser console for actual API URL being used

### MongoDB connection issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection from backend container
docker exec freedash-backend node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://mongodb:27017/freedash').then(() => console.log('Connected')).catch(e => console.error(e))"
```

### Port already in use

```bash
# Check what's using the port
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :80

# Change ports in .env file and restart
```

## 📝 Production Checklist

- [ ] Strong JWT secrets generated
- [ ] Strong MongoDB password set
- [ ] Strong Redis password set
- [ ] Domain names configured
- [ ] SSL certificates installed
- [ ] Environment variables updated for production
- [ ] Firewall configured (ports 80, 443 open)
- [ ] Database backups scheduled
- [ ] Monitoring set up (optional)
- [ ] Admin user created in application

## 🔐 Security Recommendations

1. **Firewall Setup:**
   ```bash
   # Ubuntu/Debian
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Change Default Passwords:**
   - MongoDB root password
   - Redis password
   - JWT secrets

3. **Keep Docker Updated:**
   ```bash
   sudo apt update && sudo apt upgrade docker.io
   ```

4. **Regular Backups:**
   - Set up automated MongoDB backups
   - Store backups off-server

## 📞 Support

If you encounter issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Ensure all services are healthy: `docker-compose ps`
4. Check network connectivity between containers

---

**Congratulations!** Your Free Dash application should now be running on your VPS! 🎉

