# Free Dash - Docker Setup

This project is now fully containerized with Docker! 🐳

## Quick Start (Local Development)

1. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your configuration

3. **Start all services:**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3000

## Services Included

- **Frontend**: React app served via Nginx (Port 80)
- **Backend**: Node.js/Express API (Port 3000)
- **MongoDB**: Database (Port 27017)
- **Redis**: Cache/Queue (Port 6379)

## Production Deployment

See **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** for complete VPS deployment instructions.

## Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose build
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Execute command in container
docker exec -it freedash-backend sh
```

## Environment Variables

All environment variables are configured in `.env` file. See `.env.example` for reference.

**Required Variables:**
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `PTERODACTYL_URL` - Your Pterodactyl panel URL
- `PTERODACTYL_API_KEY` - Your Pterodactyl API key

## File Structure

```
.
├── backend/
│   ├── Dockerfile          # Backend container definition
│   ├── .dockerignore       # Files to exclude from build
│   └── src/                # Source code
├── frontend/
│   ├── Dockerfile          # Frontend container definition
│   ├── nginx.conf          # Nginx configuration
│   ├── .dockerignore       # Files to exclude from build
│   └── src/                # Source code
├── docker-compose.yml      # Orchestration file
├── .env.example            # Environment template
└── DOCKER_DEPLOYMENT.md    # VPS deployment guide
```

## Troubleshooting

### Port conflicts
If ports 80, 3000, 27017, or 6379 are already in use, change them in `.env`:
```env
FRONTEND_PORT=8080
BACKEND_PORT=3001
MONGO_PORT=27018
REDIS_PORT=6380
```

### MongoDB connection issues
Ensure `MONGODB_URI` in `.env` uses `mongodb://mongodb:27017/freedash` for Docker MongoDB, or your external MongoDB URI.

### Frontend API errors
Make sure `VITE_API_URL` in `.env` matches your backend URL. Rebuild frontend after changing:
```bash
docker-compose build frontend
docker-compose up -d frontend
```

## Need Help?

Check the detailed deployment guide: [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

