# SportsCity

SportsCity is a capstone web application oriented around **General Santos City sports**: facility booking and tournament management, presented through a marketing landing experience and authenticated user areas.

## System overview

| Layer | Technology |
|--------|------------|
| Backend | [Laravel 12](https://laravel.com/) (PHP 8.2+) |
| Frontend | [React 19](https://react.dev/) with [Inertia.js](https://inertiajs.com/) |
| Build | [Vite 6](https://vitejs.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| UI | [Radix UI](https://www.radix-ui.com/), [Headless UI](https://headlessui.com/), [Lucide](https://lucide.dev/) icons |
| Routing helpers | [Ziggy](https://github.com/tighten/ziggy) (Laravel routes in JS) |

The public home route renders a full-page landing (`welcome`). Signed-in users can access the **dashboard** and **settings** (profile, password, appearance). Authentication uses Laravel’s session-based stack (register, login, logout, password reset, optional email verification flows).

### Roles

The database includes a **roles** model and a `role_user` pivot. Default roles are seeded as:

- Athlete  
- Facility Manager  
- League Organizer  
- Admin  

The `role` middleware alias is registered in `bootstrap/app.php` for route protection when you wire routes to it.

## Requirements

- **PHP** 8.2 or newer (CI uses 8.4)
- **Composer** 2.x
- **Node.js** 18+ recommended (CI uses 22)
- **npm** (or compatible client)

## Local setup

1. **Install PHP dependencies**

   ```bash
   composer install
   ```

2. **Install JavaScript dependencies**

   ```bash
   npm install
   ```

3. **Environment**

   Copy your environment file from the project template if your repo includes `.env.example`:

   ```bash
   cp .env.example .env
   ```

   If you do not have `.env.example`, create a `.env` file and set at least:

   - `APP_NAME`, `APP_URL`, `APP_KEY` (run `php artisan key:generate`)
   - Database: `DB_CONNECTION`, and for MySQL/Postgres the usual `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
   - For local SQLite: ensure `DB_CONNECTION=sqlite` and that `database/database.sqlite` exists (e.g. `touch database/database.sqlite`)

   Never commit real secrets or production credentials.

4. **Application key**

   ```bash
   php artisan key:generate
   ```

5. **Database**

   ```bash
   php artisan migrate
   ```

   Optional seed (roles + a factory user):

   ```bash
   php artisan db:seed
   ```

   The default seeded user from `DatabaseSeeder` is `test@example.com` (see seeder for details; change the password in your environment as needed).

6. **Build assets (production-style check)**

   ```bash
   npm run build
   ```

## Development

**All-in-one (recommended):** Laravel’s Composer script starts the PHP server, queue worker, and Vite dev server together:

```bash
composer run dev
```

**Separate processes** (equivalent):

- `php artisan serve`
- `php artisan queue:listen --tries=1` (if you use queues)
- `npm run dev`

Then open the URL shown by `artisan serve` (typically `http://127.0.0.1:8000`).

### Useful npm scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production frontend build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write on `resources/` |
| `npm run format:check` | Prettier check |

### PHP tooling

| Command | Purpose |
|---------|---------|
| `./vendor/bin/pest` | Run tests |
| `./vendor/bin/pint` | Laravel Pint (code style) |

## Project layout (high level)

- `app/` — Controllers, models, middleware, form requests  
- `routes/` — `web.php`, `auth.php`, `settings.php`, `console.php`  
- `resources/js/` — Inertia pages, layouts, components (`pages/`, `components/`, `layouts/`)  
- `resources/views/` — Blade shell (e.g. Inertia root view)  
- `database/migrations/`, `database/seeders/` — Schema and seeds  
- `tests/` — Pest tests  

## Health check

Laravel registers a health route at `/up` (see `bootstrap/app.php`).

## Continuous integration

GitHub Actions workflows under `.github/workflows/` run on `main` and `develop`:

- **tests** — `npm ci`, `npm run build`, Composer install, SQLite DB, `php artisan key:generate`, `./vendor/bin/pest`
- **lint** — frontend lint/format checks (see workflow file for exact steps)

Ensure `.env.example` exists in the repository if you want CI’s “copy env” step to succeed without changes.

## License

See `composer.json` (Laravel starter kit is MIT unless your team has changed licensing).
