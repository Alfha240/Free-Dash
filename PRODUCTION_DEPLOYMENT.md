# Production Deployment Guide

## Backend Environment Variables

Create `.env` file in backend directory:

```env
# Database
MONGO_URI=your-mongodb-connection-string

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Server Port
PORT=3000

# Pterodactyl Panel
PTERODACTYL_URL=https://your-panel-domain.com
PTERODACTYL_API_KEY=your-pterodactyl-api-key
PTERODACTYL_CLIENT_API_KEY=your-pterodactyl-client-key

# Frontend URL (for email links)
FRONTEND_URL=https://your-frontend-domain.com
```

## Frontend Environment Variables

Create `.env` file in frontend directory:

```env
# Backend API URL
VITE_API_URL=https://your-backend-domain.com
```

## Production Deployment Steps

### Backend:
1. Set `FRONTEND_URL` to your actual domain (e.g., `https://lordcloud.in`)
2. Deploy backend to your server
3. Make sure port 3000 is accessible

### Frontend:
1. Set `VITE_API_URL` to your backend URL (e.g., `https://api.lordcloud.in`)
2. Run `npm run build`
3. Deploy `dist` folder to your hosting

## Example Production URLs:

**If your domain is `lordcloud.in`:**

Backend `.env`:
```
FRONTEND_URL=https://lordcloud.in
```

Frontend `.env`:
```
VITE_API_URL=https://api.lordcloud.in
```

या अगर backend भी same domain पर है:
```
VITE_API_URL=https://lordcloud.in:3000
```

## Important Notes:
- ✅ All email links will automatically use `FRONTEND_URL`
- ✅ All API calls will automatically use `VITE_API_URL`
- ✅ No hardcoded localhost URLs
- ✅ Works on any domain
