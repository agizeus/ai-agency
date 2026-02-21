# 📦 AI Agency Deployment Package

## Enthaltene Dateien

### Haupt-Guide
| Datei | Beschreibung |
|-------|--------------|
| `DEPLOY-GUIDE.md` | Kompletter Deployment-Guide mit allen Themen |
| `VERCEL-CHEATSHEET.md` | Schnellreferenz für Vercel |

### Code-Snippets (kopierfertig)
| Datei | Pfad in Projekt | Beschreibung |
|-------|-----------------|--------------|
| `metadata-config.ts` | `app/layout.tsx` | SEO Meta-Tags Konfiguration |
| `opengraph-image.tsx` | `app/opengraph-image.tsx` | Dynamische OG-Image Generierung |
| `robots-config.ts` | `app/robots.ts` | robots.txt für SEO |
| `sitemap-config.ts` | `app/sitemap.ts` | XML Sitemap |
| `analytics-config.tsx` | `components/` | Plausible + GA4 Integration |

### Konfiguration
| Datei | Beschreibung |
|-------|--------------|
| `jsconfig.json` | Path Aliases (@/*) |

## Schnellstart

```bash
# 1. Snippets kopieren
cp snippets/metadata-config.ts ../app/layout.tsx
cp snippets/opengraph-image.tsx ../app/opengraph-image.tsx
cp snippets/robots-config.ts ../app/robots.ts
cp snippets/sitemap-config.ts ../app/sitemap.ts
cp snippets/analytics-config.tsx ../components/

# 2. Umgebungsvariablen setzen
# .env.local
echo "NEXT_PUBLIC_SITE_URL=https://deine-domain.de" >> .env.local
echo "NEXT_PUBLIC_PLAUSIBLE_DOMAIN=deine-domain.de" >> .env.local
echo "NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX" >> .env.local

# 3. Deploy
vercel --prod
```

## Wichtige Schritte

1. **Domain registrieren**: Cloudflare empfohlen
2. **DNS einrichten**: A-Record → 76.76.21.21
3. **SSL aktivieren**: Cloudflare SSL/TLS → Full (strict)
4. **Meta-Tags anpassen**: Titel, Beschreibung, Keywords
5. **OG-Image designen**: 1200×630px Brand-Template
6. **Analytics wählen**: Plausible (DSGVO) oder GA4
7. **Search Console**: Property hinzufügen

## DSGVO-Checkliste

- [ ] Cookie-Banner (nur bei GA4)
- [ ] Datenschutzerklärung aktualisiert
- [ ] Impressum vorhanden
- [ ] Opt-out Option (wenn nötig)
- [ ] Hosting-Vertrag (bei externen Diensten)

---
**Hephaistos (CMO) | Olymp Holding | 2026-02-19**
