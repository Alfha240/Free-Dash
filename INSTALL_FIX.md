# Fix Installation Script Issues

If you're getting errors like:
```
./install.sh: line 1: version: command not found
./install.sh: line 2: oid: command not found
```

This is usually caused by Windows line endings (CRLF) instead of Unix (LF).

## Quick Fix

Run this command to fix the line endings:

```bash
sed -i 's/\r$//' install.sh
chmod +x install.sh
./install.sh
```

Or use the fix script:

```bash
chmod +x fix-install.sh
./fix-install.sh
./install.sh
```

## Alternative: Use dos2unix

If you have `dos2unix` installed:

```bash
dos2unix install.sh
chmod +x install.sh
./install.sh
```

## Manual Installation

If the script still doesn't work, follow manual steps:

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in

# 2. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Configure environment
cp .env.example .env
nano .env  # Edit with your settings

# 4. Build and start
docker-compose build
docker-compose up -d
```

## Verify Script

Check if the script is valid:

```bash
# Check first line (should be #!/bin/bash)
head -1 install.sh

# Check file type
file install.sh

# Test syntax
bash -n install.sh
```

