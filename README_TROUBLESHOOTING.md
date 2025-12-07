# Troubleshooting Installation

## Common Issues and Solutions

### Issue: Script Errors "version: command not found"

**Problem:** The script has Windows line endings (CRLF) instead of Unix (LF).

**Solution:**
```bash
# Fix line endings
sed -i 's/\r$//' install.sh
chmod +x install.sh
./install.sh
```

Or install dos2unix:
```bash
apt install dos2unix -y
dos2unix install.sh
chmod +x install.sh
./install.sh
```

### Issue: Permission Denied

**Solution:**
```bash
chmod +x install.sh
./install.sh
```

### Issue: Docker Not Found

**Solution:**
The script will try to install Docker automatically. If it fails:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in, then run install.sh again
```

### Issue: Git Clone Fails

**Solution:**
```bash
# Check internet connection
ping github.com

# Try cloning manually
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash
./install.sh
```

### Issue: Port Already in Use

**Solution:**
```bash
# Check what's using the port
sudo netstat -tulpn | grep -E ':(80|3000|27017|6379)'

# Stop conflicting services or change ports in .env
nano .env
# Change BACKEND_PORT, FRONTEND_PORT, etc.
```

### Issue: Domain Not Working

**Solution:**
1. Verify DNS points to your server:
   ```bash
   dig yourdomain.com
   dig api.yourdomain.com
   ```

2. Check Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. Check SSL:
   ```bash
   sudo certbot certificates
   ```

### Issue: Services Won't Start

**Solution:**
```bash
# Check logs
docker-compose logs -f

# Check service status
docker-compose ps

# Restart services
docker-compose down
docker-compose up -d
```

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it freedash-mongodb mongosh -u admin -p
```

### Issue: Frontend Shows API Errors

**Solution:**
1. Check VITE_API_URL in .env matches your backend URL
2. Rebuild frontend:
   ```bash
   docker-compose build frontend
   docker-compose up -d frontend
   ```

## Manual Installation

If scripts don't work, install manually:

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in

# 2. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Clone repository
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash

# 4. Configure environment
cp .env.example .env
nano .env  # Edit with your settings

# 5. Build and start
docker-compose build
docker-compose up -d
```

## Getting Help

1. Check logs: `docker-compose logs -f`
2. Verify configuration: `cat .env`
3. Check service status: `docker-compose ps`
4. Review documentation: [README_INSTALL.md](./README_INSTALL.md)

