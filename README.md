# Run Strong PWA

A phone-first strength app built around:
- Monday / Wednesday / Saturday lifting
- Protected Runna hard days Tuesday / Friday
- Automatic double-progression guidance
- Extra ab finishers
- No ab wheel required
- Knee / calf / Achilles / soreness check-in
- Automatic lower-body volume reduction on rough days
- Runner-specific cooldown / recovery blocks
- Local workout history using browser storage
- Installable PWA / Add to Home Screen support

## Run locally
From this folder:
python3 -m http.server 8080

Then open http://localhost:8080

## Put on iPhone Home Screen
For full PWA behavior, host this folder over HTTPS (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).
Open the site in Safari → Share → Add to Home Screen.

Important: data is stored locally in the browser on that device. Clearing site data will erase logs unless you export them first (export can be added in a future version).
