#!/bin/sh
set -e

echo "🚀 Starting América Cannabis Backend..."

# Run Prisma migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "✅ Starting server..."
exec npm start
