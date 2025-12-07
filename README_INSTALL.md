# 🚀 Free Dash - Installation Guide

One-command installation script for deploying Free Dash on your VPS with domain support.

## 📋 Prerequisites

- **VPS/Server** with Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- **Domain name** (optional - can use IP address)
- **Root or sudo access**
- **Pterodactyl Panel** API credentials

## 🎯 Quick Installation

### Option 1: One-Command Install (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/Alfha240/Free-Dash/main/install.sh | bash
```

Or download and run:

```bash
wget https://raw.githubusercontent.com/Alfha240/Free-Dash/main/install.sh
chmod +x install.sh
./install.sh
```

### Option 2: Manual Installation

```bash
# 1. Clone repository
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash

# 2. Run installation script
chmod +x install.sh
./install.sh
```

## 📝 Installation Process

The installation script will:

1. ✅ Check and install Docker & Docker Compose
2. ✅ Clone/update the repository
3. ✅ Prompt for domain configuration
4. ✅ Generate secure secrets (JWT, passwords)
5. ✅ Configure Pterodactyl panel settings
6. ✅ Setup Discord OAuth (optional)
7. ✅ Build and start all Docker containers
8. ✅ Configure Nginx reverse proxy (if domain provided)
9. ✅ Setup SSL certificates (if domain provided)

## 🌐 Domain Configuration

### With Domain (Recommended for Production)

During installation, you'll be asked:
- **Main Domain**: `yourdomain.com`
- **API Subdomain**: `api.yourdomain.com`

The script will automatically:
- Configure Nginx reverse proxy
- Setup SSL with Let's Encrypt
- Update all URLs in the application

### Without Domain (Development/Testing)

You can skip domain setup and use:
- **Frontend**: `http://YOUR_SERVER_IP`
- **Backend**: `http://YOUR_SERVER_IP:3000`

## 🔧 Post-Installation

### Setup Domain (if skipped during install)

```bash
cd ~/freedash  # or your installation directory
sudo ./setup-domain.sh
```

This will:
- Install and configure Nginx
- Setup SSL certificates
- Update application URLs

### Manual Domain Setup

1. **Point DNS to your server:**
   ```
   A Record: yourdomain.com → YOUR_SERVER_IP
   A Record: api.yourdomain.com → YOUR_SERVER_IP
   ```

2. **Run domain setup:**
   ```bash
   sudo ./setup-domain.sh
   ```

3. **Update .env file:**
   ```bash
   nano .env
   # Update FRONTEND_URL and VITE_API_URL to use https://
   ```

4. **Rebuild frontend:**
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

## 📊 Service Management

### View Logs
```bash
cd ~/freedash
docker-compose logs -f
```

### Restart Services
```bash
docker-compose restart
```

### Stop Services
```bash
docker-compose down
```

### Start Services
```bash
docker-compose up -d
```

### Check Status
```bash
docker-compose ps
```

## 🔐 Configuration Files

### Environment Variables (`.env`)

Located at: `~/freedash/.env`

Key variables:
- `FRONTEND_URL` - Your frontend domain
- `VITE_API_URL` - Your API domain
- `JWT_SECRET` - Auto-generated secret
- `PTERODACTYL_URL` - Your Pterodactyl panel URL
- `PTERODACTYL_API_KEY` - Your Pterodactyl API key

### Nginx Configuration

Located at: `/etc/nginx/sites-available/freedash`

## 🛠️ Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo netstat -tulpn | grep -E ':(80|3000|27017|6379)'

# Restart Docker
sudo systemctl restart docker
docker-compose up -d
```

### Domain not working

1. **Check DNS:**
   ```bash
   dig yourdomain.com
   dig api.yourdomain.com
   ```

2. **Check Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Check SSL:**
   ```bash
   sudo certbot certificates
   ```

### Frontend shows API errors

1. Check `VITE_API_URL` in `.env`
2. Rebuild frontend:
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

### MongoDB connection issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it freedash-mongodb mongosh -u admin -p
```

## 📚 Additional Documentation

- **Docker Deployment**: [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)
- **Docker Quick Start**: [README_DOCKER.md](./README_DOCKER.md)
- **Setup Summary**: [DOCKER_SETUP_SUMMARY.md](./DOCKER_SETUP_SUMMARY.md)

## 🔄 Updating

```bash
cd ~/freedash
git pull
docker-compose build
docker-compose up -d
```

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure all services are running: `docker-compose ps`
4. Check firewall settings (ports 80, 443, 3000)

## 📝 Installation Directory

Default installation directory: `~/freedash`

You can specify a custom directory:
```bash
./install.sh /opt/freedash
```

## ✅ Installation Checklist

After installation, verify:
- [ ] All containers are running: `docker-compose ps`
- [ ] Frontend accessible: `http://yourdomain.com` or `http://YOUR_IP`
- [ ] Backend accessible: `http://api.yourdomain.com` or `http://YOUR_IP:3000`
- [ ] SSL certificate installed (if using domain)
- [ ] MongoDB connection working
- [ ] Pterodactyl API connection working

---

**🎉 Congratulations!** Your Free Dash installation is complete!

For detailed deployment instructions, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

