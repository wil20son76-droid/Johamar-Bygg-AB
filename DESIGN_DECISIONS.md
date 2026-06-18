# DESIGN_DECISIONS — JOHAMAR BYGG AB

Última actualización: 2026-06-19

Registro de decisiones de diseño tomadas durante el desarrollo.
Cada decisión incluye el razonamiento para no revertirla accidentalmente.

---

## Branding

### Colores de marca
- **Navy `#062f63`**: color principal, del logo original.
- **Naranja `#d35400`**: color secundario, del logo original. Usado en CTAs, badges ROT, acentos.
- **Fondo greige `#f4f1ea` / `#ece7dd`**: cálido, diferenciador vs. competencia que usa blanco puro.
- **Decisión**: no cambiar estos valores sin cambiar también el logo, ya que están sincronizados.

### Logo
- **Archivo activo**: `assets/logo-johamar-nuevo.png` (1855×788px)
- **Fondo blanco** (no transparente) → no usar `filter: brightness(0) invert(1)` en el footer.
- **Footer**: se muestra sobre una tarjeta blanca semitransparente (`background: rgba(255,255,255,0.96); border-radius: 8px; padding: 4px 10px`) sobre el fondo navy del footer. Este es el patrón estándar para logos con fondo blanco en footers oscuros.
- **Antiguo logo** (`logo-johamar-full.png`): ya no referenciado en ningún HTML. Se puede eliminar.

### Tipografías
- **Sora** (headings 600/700/800): moderna, técnica, premium. Carga desde Google Fonts.
- **DM Sans** (body 400/500/600): legible, neutral, complementa bien a Sora.
- **Decisión**: no mezclar con otras fuentes. Estas dos son suficientes.

---

## Hero

### H1
- **Actual**: "Byggföretaget i hela Stockholmsregionen – från idé till nycklarna i hand"
- **Por qué**: orientado al cliente (qué obtiene), no a la empresa. Incluye geografía para SEO.
- **Regla**: debe haber UN SOLO H1 en toda la página.

### Subtítulo (hero-lead)
- **Actual**: "Köksrenoveringar, målning, altanbyggen, fasadmålning och golv med 12+ års erfarenhet. Vi hjälper privatpersoner, företag och fastighetsägare i hela Storstockholm."
- **Cambio aplicado**: se eliminó la lista larga de municipios ("Kungsängen, Upplands-Bro, Järfälla..."). Motivo: poco profesional, difícil de leer. "Storstockholm" es más limpio y abarca más.

### Trust badges en hero
- Formato checkmark (`✓`) en 4 puntos: F-skattsedel, Fullt försäkrade, ROT-avdrag 30%, Kostnadsfri offert.
- El badge ROT tiene fondo naranja (`ht-rot`) para destacar el beneficio económico.
- **No añadir más de 4** — demasiados badges pierden impacto.

### CTAs del hero
- Primario (naranja): "Begär gratis offert →" → `#kontakt`
- Secundario (outline): "Ring oss nu: 072 032 42 03" → `tel:+46720324203`
- **Orden deliberado**: conversión (formulario) primero, luego teléfono. No invertir.

### Imagen hero
- **Archivo**: `assets/hero-stuga.jpg` — foto real de un proyecto de cabaña/stuga.
- **Decisión**: usar foto real en lugar de stock. Credibilidad.
- Tiene `fetchpriority="high"` y `<link rel="preload">` en `<head>` para LCP óptimo.
- El efecto parallax se desactiva si `prefers-reduced-motion`.

---

## Trust Strip (banda de badges)

- Aparece **entre el hero y la stats-band**, no dentro del hero.
- Fondo navy (`var(--brand)`) — contraste visual con el hero.
- 6 ítems: 🛡️ Fullt försäkrade · ✅ F-skattsedel · 💰 ROT-avdrag 30% · ⭐ 12+ års erfarenhet · 📍 Stockholmsregionen · 🔨 300+ genomförda projekt
- **Decisión**: los emojis son intencionales. Dan calor visual, son universales y evitan iconos SVG adicionales en esta banda específica.

---

## Áreas de servicio

### Sección "Områden vi arbetar i"
- **Se mantiene dentro de la sección "Varför välja oss"**, no como sección separada.
- 4 tarjetas de área con chips de municipios: Stockholm stad, Norra förorter, Södra & östra, Västra & nordöstra.
- Las chips de "Norra förorter" son links a páginas de municipio (SEO interno).
- **Decisión**: esta sección se mantiene aunque sea larga. Aporta señales locales de SEO que Google valora.

### Listas de municipios en texto descriptivo
- **Eliminadas** donde aparecían solo como texto (ej. hero lead).
- **Motivo**: imagen poco profesional, difícil de leer, no aporta SEO significativo en texto corrido.
- **Excepción**: la sección "Områden" con sus tarjetas/chips se mantiene (estructura visual ≠ lista de texto).

---

## Reseñas y credibilidad

### Sin ratings falsos
- **Decisión tomada**: se eliminaron `aggregateRating`, reseñas inventadas y testimonials fabricados.
- **Motivo**: Google puede penalizar datos estructurados con ratings sin base real. Riesgo legal.
- **Alternativa implementada**:
  - Botón "Se våra omdömen" → perfil real de Servicefinder
  - Botón "Lämna ett omdöme på Google" → Google review link real
- **No revertir esta decisión** sin tener reseñas verificadas.

### Servicefinder
- URL del perfil: `https://servicefinder.se/foretag/7080833`
- Verificado por el usuario. Perfil existe y puede recibir reseñas reales.

---

## Galería / Proyectos

### Instagram LightWidget
- Widget de LightWidget conectado a @johamarbygg (ID: `9d27966f021c5df8ab62a83fd35479a1`)
- Incrustado como `<iframe>` dentro de `.ig-widget[data-ig-widget]`
- **Problema conocido**: el iframe puede colgar el renderer de preview (screenshots se cuelgan). En producción funciona correctamente.

### Fallback local
- Si el widget no carga (JavaScript bloqueado, LightWidget caído, plan expirado), se muestran 6 fotos locales de `assets/projects/`.
- El fallback se activa via `MutationObserver` en `script.js` si el iframe no inserta contenido en 3s.

### Fotos de proyectos
- 6 JPGs optimizados en `assets/projects/`, orientación corregida (EXIF fix aplicado).
- No son stock — son fotos reales de proyectos de JOHAMAR BYGG AB.

---

## Estructura visual

### Header
- Sticky (no fixed), con `position: sticky; top: 0` — se desplaza con la página hasta alcanzar el top.
- Añade sombra y fondo semitransparente al hacer scroll (`is-scrolled` class via JS).
- Contiene: logo izquierda, teléfono centro (desktop), toggle móvil derecha, nav-menu.
- El teléfono en header (`nav-phone`) se oculta en ≤900px (el mobile CTA bar lo reemplaza).

### Mobile CTA bar
- Visible solo en ≤760px, fija en bottom.
- 2 botones: "Ring" (naranja, icono teléfono) y "Begär offert" (azul marino).
- Los botones flotantes (WhatsApp, Facebook, Instagram, to-top) suben `60px` en móvil para no superponerse.
- `body { padding-bottom: 58px }` en móvil para que el footer no quede tapado.

### Sección de proceso
- Simplificada de 4 pasos a 3 pasos: Kontakta oss → Kostnadsfri offert → Vi bygger – du njuter.
- El paso 1 incluye un link "Ring 072 032 42 03" directamente en el contenido del paso.
- Fondo oscuro (navy) con texto blanco — contraste con las secciones adyacentes.

### Om Oss
- Split layout: texto a la izquierda, stats panel a la derecha.
- Incluye bloque legal: `Org.nr: 559338-8449 · F-skattsedel · Fullt försäkrade · Registrerade sedan 2021`
- Incluye párrafo ROT: el usuario no necesita gestionar nada, aparece directo en la factura.
- **No añadir "hantverkare från hela världen"** o frases genéricas — el texto actual es específico y honesto.

### Orden de secciones (NO cambiar)
```
hero → trust-strip → stats → intro-band → #tjanster → #om-oss →
#team → #varfor → #process → #projekt → #omdomen → #faq → #kontakt → footer
```

---

## Teléfono unificado

- **Número único en toda la web**: `072 032 42 03` / `+46720324203`
- Aplicado en: HTML href, texto visible, WhatsApp wa.me/, schema.org, integritetspolicy, todos los archivos generados.
- **Decisión**: un solo número evita confusión. Si el usuario tiene dos líneas, redirigir desde la segunda al número principal.

---

## GDPR y cookies

- Cookie banner implementado con `localStorage` para recordar la elección.
- GA4 y Google Ads NO se cargan hasta que el usuario acepta.
- Google Consent Mode v2: todos los signals en `denied` por defecto.
- FormSubmit tiene checkbox de consentimiento obligatorio (requerido con `required`).
- Integritetspolicy en página separada con `noindex, follow`.
