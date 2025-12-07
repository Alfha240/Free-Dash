# 🚀 Quick Installation Guide

If you're getting errors with the direct curl command, try these alternative methods:

## Method 1: Download Script First (Recommended)

```bash
# Download the script
curl -fsSL https://raw.githubusercontent.com/Alfha240/Free-Dash/main/install.sh -o install.sh

# Make it executable
chmod +x install.sh

# Run it
./install.sh
```

## Method 2: Clone Repository First

```bash
# Clone the repository
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash

# Make script executable
chmod +x install.sh

# Run installation
./install.sh
```

## Method 3: Manual Installation

If scripts don't work, follow manual steps:

```bash
# 1. Clone repository
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash

# 2. Install Docker (if not installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in

# 3. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 4. Copy environment template
cp .env.example .env

# 5. Edit .env file with your settings
nano .env

# 6. Build and start
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Error: "version: command not found"

This usually means the script has encoding issues. Try:

```bash
# Method 1: Clone first
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash
chmod +x install.sh
./install.sh

# Method 2: Fix line endings
sed -i 's/\r$//' install.sh
chmod +x install.sh
./install.sh
```

### Error: "Permission denied"

```bash
chmod +x install.sh
./install.sh
```

### Error: "Docker not found"

The script will try to install Docker automatically. If it fails:

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in
```

## What You Need

- VPS with Ubuntu 20.04+ / Debian 11+
- Domain name (optional)
- Pterodactyl Panel API credentials
- Root or sudo access

## After Installation

1. **Access your application:**
   - Frontend: `http://YOUR_IP` or `https://yourdomain.com`
   - Backend: `http://YOUR_IP:3000` or `https://api.yourdomain.com`

2. **Setup domain (if using domain):**
   ```bash
   sudo ./setup-domain.sh
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

## Need Help?

- Check [README_INSTALL.md](./README_INSTALL.md) for detailed guide
- Check [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for VPS setup
- View logs: `docker-compose logs -f`

