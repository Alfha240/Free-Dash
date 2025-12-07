# 🚀 Free Dash - Pterodactyl Free Hosting Platform

A production-ready Minecraft hosting solution where users earn coins to create servers.

**Free-Panel by WBPL Pvt. Ltd**

## ⚡ Quick Start

### One-Command Installation

```bash
curl -fsSL https://raw.githubusercontent.com/Alfha240/Free-Dash/main/install.sh | bash
```

Or clone and install:

```bash
git clone https://github.com/Alfha240/Free-Dash.git
cd Free-Dash
chmod +x install.sh
./install.sh
```

## 📋 What You'll Need

- **VPS/Server** (Ubuntu 20.04+ / Debian 11+)
- **Domain name** (optional - can use IP)
- **Pterodactyl Panel** API credentials
- **Root or sudo access**

## 🐳 Docker Deployment (Recommended)

This project is fully containerized with Docker for easy deployment.

### Installation Options

1. **One-Command Install** (Recommended)
   ```bash
   ./install.sh
   ```

2. **Manual Docker Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   docker-compose up -d
   ```

### Documentation

- **[INSTALL.md](./INSTALL.md)** - Quick installation guide
- **[README_INSTALL.md](./README_INSTALL.md)** - Complete installation instructions
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Detailed VPS deployment guide
- **[README_DOCKER.md](./README_DOCKER.md)** - Docker commands reference

## 🏗️ Tech Stack

- **Backend**: Node.js, TypeScript, Express, Mongoose, MongoDB
- **Frontend**: React, Vite, TypeScript, TailwindCSS, Zustand, React Query
- **Infrastructure**: Docker, Docker Compose, Nginx, Redis

## 🌐 Domain Setup

After installation, configure your domain:

```bash
sudo ./setup-domain.sh
```

This will:
- Configure Nginx reverse proxy
- Setup SSL with Let's Encrypt
- Update application URLs

## 📦 Services

- **Frontend**: React app served via Nginx
- **Backend**: Node.js/Express API
- **MongoDB**: Database
- **Redis**: Cache/Queue

## 🔧 Development Setup (Without Docker)

### Backend
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Create `.env` file
4. Build: `npm run build`
5. Start: `npm start`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Configure `.env`: `VITE_API_URL=http://localhost:3000`
4. Build: `npm run build`
5. Preview: `npm run preview`

## 📚 Documentation

- **[INSTALL.md](./INSTALL.md)** - Quick installation
- **[README_INSTALL.md](./README_INSTALL.md)** - Full installation guide
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - VPS deployment
- **[README_DOCKER.md](./README_DOCKER.md)** - Docker reference
- **[DOCKER_SETUP_SUMMARY.md](./DOCKER_SETUP_SUMMARY.md)** - Setup overview

## 🛠️ Common Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down
```

## 👤 Admin Setup

- First user registration is role 'user'
- Manually update role to 'admin' in MongoDB to access admin routes
- Create plans via POST `/admin/plans`
- Create redeem codes via POST `/admin/redeem-codes`

## 📡 API Endpoints

- Auth: `/auth/login`, `/auth/register`
- Servers: `/servers`, `/servers/create`
- Coins: `/coins/redeem`
- Tasks: `/tasks`, `/tasks/complete`

See `backend/src/routes` for all endpoints.

## 🔒 Security

- JWT authentication
- Secure password hashing
- CORS protection
- Helmet security headers
- Environment-based configuration

## 📝 License

Free-Panel by WBPL Pvt. Ltd

---

**Need Help?** Check the [installation guide](./README_INSTALL.md) or [deployment guide](./DOCKER_DEPLOYMENT.md)
