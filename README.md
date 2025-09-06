# Al-Farabi Backend (Node.js + Express + MongoDB)

Ready-to-run backend for your React admin panel.

## Quick Start
```bash
cd backend
cp .env.sample .env
npm install
npm run dev
```
Edit `.env` with your Mongo URI and JWT secret.

### Seed an Admin
```bash
# optionally set envs first in .env (SEED_ADMIN_*)
npm run seed:admin
```

## API Endpoints
- `POST /api/auth/register` (one-time to create admin)
- `POST /api/auth/login`
- `GET /api/auth/me` (requires Bearer token)

- `GET /api/products`
- `POST /api/products` (admin only)
- `PUT /api/products/:id` (admin only)
- `DELETE /api/products/:id` (admin only)

Same CRUD for `/api/services` and `/api/logistics`.

- `POST /api/upload` (admin only, form-data: image)

## Notes
- Static uploads served at `/uploads/<filename>`
- Set CORS origin with `CORS_ORIGIN` in `.env`
- Uses ESM (`type: module`)
