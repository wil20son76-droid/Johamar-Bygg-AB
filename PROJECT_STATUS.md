# PROJECT_STATUS — JOHAMAR BYGG AB

Última actualización: 2026-06-19
Commit: c1e2a80
Repo: https://github.com/wil20son76-droid/Johamar-Bygg-AB

---

## Estado actual

El sitio está **completo y publicado en GitHub**. Falta conectar el dominio `johamarbygg.se` a hosting (one.com o GitHub Pages) y activar GA4/FormSubmit con IDs reales.

---

## Estructura de archivos

```
mi-nuevo-proyecto/
├── index.html                      ← Sitio principal (una sola página)
├── styles.css                      ← Todos los estilos (variables CSS, mobile-first)
├── script.js                       ← JS puro: menú, scroll, modales, form, GA4
├── integritetspolicy.html          ← Política de privacidad (noindex)
├── sitemap.xml                     ← 11 URLs (johamarbygg.se)
├── robots.txt                      ← Allow all, sitemap referenciado
├── koksrenovering-stockholm.html   ← Landing page servicio
├── maleri-stockholm.html
├── golvslipning-stockholm.html
├── altan-terrass-stockholm.html
├── takrengoring-stockholm.html
├── fasadrenovering-stockholm.html
├── byggfirma-kungsangen.html       ← Landing page municipio (SEO local)
├── byggfirma-upplands-bro.html
├── byggfirma-jarfalla.html
├── byggfirma-sollentuna.html
└── assets/
    ├── logo-johamar-nuevo.png      ← Logo activo (1855×788px, ratio 2.35:1)
    ├── logo-johamar-full.png       ← Logo antiguo — SE PUEDE ELIMINAR
    ├── JOHAMAR  AB Nuevo.zip       ← ZIP origen del logo — SE PUEDE ELIMINAR
    ├── hero-stuga.jpg              ← Hero: foto real de proyecto (cabaña)
    ├── team-johamar.jpg            ← Equipo: 4 personas + furgoneta con logo
    ├── favicon.ico / favicon-16.png / favicon-32.png / favicon-48.png
    ├── apple-touch-icon.png
    ├── icon-192.png / icon-512.png
    └── projects/
        ├── koksrenovering-stockholm.jpg
        ├── maleri-stockholm.jpg
        ├── golvslipning-stockholm.jpg
        ├── altan-terrass-stockholm.jpg
        ├── takrengoring-stockholm.jpg
        └── fasadrenovering-stockholm.jpg
```

Generadores (no en el repo, solo local):
```
C:\Users\wil16\Downloads\lp-gen\
├── template.html          ← Template para páginas de servicio
├── template-kommun.html   ← Template para páginas municipales
├── data.json              ← Datos de las 6 páginas de servicio
└── data-kommun.json       ← Datos de las 4 páginas municipales
```

---

## Secciones de index.html (en orden)

| ID / anchor | Sección | Descripción |
|---|---|---|
| `#hem` | Hero | Foto stuga, H1, trust badges (✓), 2 CTAs, hero-reassure |
| — | Trust strip | Banda azul con 6 badges: 🛡️✅💰⭐📍🔨 |
| `#stats` | Stats band | 4 contadores: 14+ år, 4 team, 100%, 30% ROT |
| — | Intro band | CTA strip "Behöver du hjälp med renovering?" |
| `#tjanster` | Servicios | 6 tarjetas (con modal "Läs mer") + pills LP links |
| `#om-oss` | Om Oss | Split: texto + stats panel (Sedan 2012, Certifierade, Lokalt) |
| `#team` | Möt oss | Foto equipo + texto |
| `#varfor` | Varför välja oss | 6 benefit cards + "Områden vi arbetar i" (4 area cards) |
| `#process` | Process | 3 pasos: Kontakta oss → Offert → Vi bygger |
| `#projekt` | Galería | Instagram LightWidget + fallback 6 fotos locales |
| `#omdomen` | Omdömen | Servicefinder link + Google review CTA (sin ratings falsos) |
| `#faq` | FAQ | 4 preguntas en `<details>` |
| `#kontakt` | Kontakt | Formulario AJAX + info de contacto |
| — | Footer | Grid 4 cols: logo, contacto, servicios, redes sociales |

---

## Diseño actual

### Paleta de colores (variables CSS en `:root`)
```css
--brand:       #062f63   /* Navy azul (color principal) */
--brand-dark:  #041f43   /* Navy más oscuro (hover, footer bg) */
--brand-2:     #d35400   /* Naranja (CTA, badges ROT, acentos) */
--brand-2-dark:#b8480a   /* Naranja oscuro (hover) */
--ink:         #1f2937   /* Texto principal */
--muted:       #5a6675   /* Texto secundario */
--line:        #e6e1d7   /* Bordes y separadores */
--bg:          #ffffff   /* Fondo principal */
--bg-soft:     #f4f1ea   /* Fondo suave (greige) */
--bg-panel:    #ece7dd   /* Panel greige */
--canvas:      #ede8e1   /* Off-white de la publicación */
```

### Tipografías (Google Fonts)
- **Headings**: `Sora` — weight 600, 700, 800
- **Body**: `DM Sans` — weight 400, 500, 600

### Logo
- **Archivo activo**: `assets/logo-johamar-nuevo.png`
- **Dimensiones**: 1855×788px, ratio 2.35:1
- **Muestra**: icono casa naranja + "JOHAMAR | AB" (navy) + "BYGG • RENOVERING" (naranja)
- **Header**: CSS `height: 48px; width: auto` → ~113×48px display
- **Footer**: CSS `height: 44px; padding: 4px 10px; background: rgba(255,255,255,0.96); border-radius: 8px`
  (tarjeta blanca porque el logo tiene fondo blanco, no transparente)

### Layout
- `--container: 1180px` — ancho máximo de contenido
- Mobile-first con media queries en 520px, 760px, 900px, 1100px
- `scroll-padding-top: 88px` (header sticky height)

---

## Funcionalidades implementadas

- **Header sticky** con teléfono `072 032 42 03` siempre visible (desktop), oculto ≤900px
- **Menú hamburguesa** móvil (toggle con animación clip-path)
- **Scroll suave** a anclas, con `prefers-reduced-motion`
- **Reveal on scroll** (IntersectionObserver) en elementos con clase `.reveal`
- **Contadores animados** (data-count, data-suffix)
- **Parallax** en imagen hero
- **Back-to-top** button (aparece al bajar 400px, encima de los floating buttons)
- **WhatsApp flotante** "Chatta med oss" con fade-in después de 2s
- **Botones flotantes**: to-top, WhatsApp, Facebook, Instagram
- **Mobile CTA bar** fija en bottom ≤760px: Ring + Begär offert
- **Lightbox** para galería (teclado, focus trap, Escape)
- **Modales de servicio** (6 servicios, focus trap, Escape, backdrop)
- **Formulario AJAX** via FormSubmit (sin recarga de página), con honeypot antispam
- **Checkbox GDPR** requerido en formulario
- **Cookie banner** con Consent Mode v2 (GA4 + Ads inactivos hasta aceptación)
- **GA4 + Google Ads** configurado pero INACTIVO (IDs son placeholders "XXXX")
- **Instagram LightWidget** (@johamarbygg) con fallback de fotos locales
- **Schema.org** `HomeAndConstructionBusiness` JSON-LD en `<head>`
- **Sitemap + robots.txt**
- **Año dinámico** en footer (`data-year`)

---

## Datos de la empresa

```
Nombre:     JOHAMAR BYGG AB
Org.nr:     559338-8449
Dirección:  Mullbärsstigen 7, 196 34 Kungsängen
Teléfono:   072 032 42 03  /  +46720324203
Email:      info@johamarbygg.se
Web:        https://johamarbygg.se
Instagram:  @johamarbygg
Facebook:   https://www.facebook.com/profile.php?id=100091965529718
Horario:    Mån–Fre 07:00–18:00
Fundación:  2021 (registro AB) / opera desde 2012 según contenido del sitio
```

---

## Problemas pendientes

1. **GA4 ID no activado** — `G-XXXXXXXXXX` en `script.js` línea 17 → requiere ID real
2. **Google Ads ID no activado** — `AW-XXXXXXXXXX` en `script.js` → requiere ID real
3. **FormSubmit no activado** — usuario debe enviar el formulario una vez y confirmar email a `info@johamarbygg.se`
4. **Dominio no conectado** — `johamarbygg.se` debe apuntar al hosting (one.com o GitHub Pages)
5. **Assets sobrantes** — `logo-johamar-full.png` y `JOHAMAR AB Nuevo.zip` pueden eliminarse
6. **Search Console** — pendiente de verificar el dominio y enviar sitemap
7. **Discrepancia de fecha** — Schema.org dice `"foundingDate": "2012"` pero Om Oss dice "Registrerade sedan 2021" — decidir qué usar

---

## Estado de las landing pages

| Archivo | Título | Estado |
|---|---|---|
| `koksrenovering-stockholm.html` | Köksrenovering i Stockholm | ✅ publicado |
| `maleri-stockholm.html` | Måleri och tapetsering i Stockholm | ✅ publicado |
| `golvslipning-stockholm.html` | Golvslipning och golvläggning i Stockholm | ✅ publicado |
| `altan-terrass-stockholm.html` | Altaner och terrasser i Stockholm | ✅ publicado |
| `takrengoring-stockholm.html` | Takrengöring i Stockholm | ✅ publicado |
| `fasadrenovering-stockholm.html` | Fasadrenovering och målning i Stockholm | ✅ publicado |
| `byggfirma-kungsangen.html` | Byggfirma & renovering i Kungsängen | ✅ publicado |
| `byggfirma-upplands-bro.html` | Byggfirma & renovering i Upplands-Bro | ✅ publicado |
| `byggfirma-jarfalla.html` | Byggfirma & renovering i Järfälla | ✅ publicado |
| `byggfirma-sollentuna.html` | Byggfirma & renovering i Sollentuna | ✅ publicado |
