#!/bin/sh
set -e

# Load environment (Docker passes env vars)

# Prisma client is generated during image build via npm postinstall

# Run Prisma migrations in production (safe to run repeatedly)
if [ "$NODE_ENV" = "production" ]; then
  echo "Running Prisma migrate deploy..."
  npx prisma migrate deploy
  echo "Running Prisma seed..."
  npx prisma db seed || true
fi

# Start server
echo "Starting server..."
exec node dist/server.js
