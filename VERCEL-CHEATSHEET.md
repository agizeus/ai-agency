# Vercel Deployment Quick Reference

## One-Command Deploy

```bash
# Alles auf einmal
git push origin main && vercel --prod
```

## Wichtige Links

| Dienst | URL |
|--------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Domains | https://vercel.com/dashboard/domains |
| Analytics | https://vercel.com/analytics |

## Troubleshooting

### Build Failed
```bash
# Lokal testen
npm run build

# Clean build
rm -rf .next node_modules
npm install
npm run build
```

### DNS Issues
- A-Record auf `76.76.21.21` prüfen
- Cloudflare Proxy temporär deaktivieren
- DNS-Propagation abwarten (dig +trace domain.de)

### 404 nach Deploy
```bash
# Prüfe vercel.json
# outputDirectory muss ".next" sein
```

## Environment Variables

```bash
# Lokal
vercel env pull .env.local

# Produktion
vercel env add KEY_NAME production
```
