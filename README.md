# Threshold — Property Management Platform

A tenant-first property management platform with separate portals for renters and landlords.

## Project Structure

```
threshold/
├── public/
│   └── _redirects          # Netlify client-side routing fix
├── src/
│   ├── pages/
│   │   ├── Landing.jsx     # Marketing landing page
│   │   ├── Tenant.jsx      # Tenant portal
│   │   └── Landlord.jsx    # Landlord portal
│   ├── main.jsx            # Router entry point
│   └── index.css           # Global styles + fonts
├── index.html
├── vite.config.js
└── package.json
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing page |
| `/tenant` | Tenant portal |
| `/landlord` | Landlord portal |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Deploy to Netlify (Step by Step)

### Step 1 — Push to GitHub

```bash
# Inside the threshold/ folder:
git init
git add .
git commit -m "Initial commit — Threshold MVP"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/threshold.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `threshold` repository

### Step 3 — Configure Build Settings

Netlify will auto-detect Vite. Confirm these settings:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |

Click **"Deploy site"**.

### Step 4 — Done

Netlify will give you a live URL like `https://threshold-abc123.netlify.app`.

Every time you push to `main`, Netlify auto-redeploys.

---

## Custom Domain (Optional)

1. In Netlify: **Site settings → Domain management → Add custom domain**
2. Enter `yourthreshold.app` (or whatever domain you own)
3. Follow the DNS instructions Netlify provides
4. SSL is automatic

---

## Notes

- The `public/_redirects` file is critical — it tells Netlify to serve `index.html` for all routes so React Router works correctly on page refresh
- All data is currently mocked/static — no backend required for the MVP
- To add a real database later, consider Supabase (Postgres) or PlanetScale
