# TODO — JOHAMAR BYGG AB

Última actualización: 2026-06-19

Prioridad: 🔴 Crítico · 🟠 Alto · 🟡 Medio · 🟢 Bajo

---

## 🔴 Crítico — Hacer antes de lanzar

### 1. Activar FormSubmit
- Abrir `index.html` en el navegador (en el dominio real o GitHub Pages)
- Enviar el formulario una vez con datos reales
- Ir a `info@johamarbygg.se` y hacer clic en el email de confirmación de FormSubmit
- Sin este paso, el formulario NO envía emails

### 2. Conectar dominio johamarbygg.se
**Opción A — GitHub Pages:**
- Ir al repo → Settings → Pages → Branch: main, Root (/)
- En DNS del dominio (one.com): añadir registros A:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- Añadir CNAME: `www` → `wil20son76-droid.github.io`
- En GitHub Pages: añadir custom domain `johamarbygg.se`

**Opción B — one.com hosting:**
- Subir todos los archivos del repo por FTP o gestor de archivos de one.com
- El sitio no tiene sistema de build → subir directamente los archivos HTML/CSS/JS/assets

### 3. Activar GA4
- Crear cuenta en analytics.google.com si no existe
- Crear propiedad para `johamarbygg.se`
- Copiar el Measurement ID (`G-XXXXXXXXXX`)
- Abrir `script.js` línea 17 y reemplazar `"G-XXXXXXXXXX"` con el ID real
- La cookie banner y el Consent Mode v2 ya están configurados

### 4. Verificar Google Search Console
- Ir a search.google.com/search-console
- Añadir propiedad `johamarbygg.se`
- Verificar con método DNS (añadir registro TXT en one.com)
- Una vez verificado, enviar sitemap: `https://johamarbygg.se/sitemap.xml`

---

## 🟠 Alto — Hacer en la primera semana

### 5. Activar Google Ads (si aplica)
- Crear cuenta en ads.google.com
- Copiar el Conversion ID (`AW-XXXXXXXXXX`) y la etiqueta de conversión
- Reemplazar en `script.js` líneas 18-19:
  ```js
  const ADS_CONVERSION_ID = "AW-TU-ID-REAL";
  const ADS_LEAD_LABEL   = "TU-ETIQUETA";
  ```

### 6. Probar formulario en móvil (iOS y Android)
- Verificar que el checkbox GDPR se puede marcar
- Verificar que el teclado no cubre el formulario
- Verificar mensaje de éxito/error visible
- Probar en Safari iOS (comportamientos distintos)

### 7. Probar menú móvil en dispositivo real
- Abrir en iPhone y Android
- Verificar hamburguesa abre/cierra correctamente
- Verificar links del menú navegan a las secciones correctas
- Verificar que el botón "Begär offert" del menú es visible y funcional

### 8. Probar botón WhatsApp flotante
- Verificar que el fade-in ocurre a los 2 segundos
- Verificar que el link abre WhatsApp con el mensaje preescrito
- Verificar en móvil que abre la app nativa

### 9. Probar Mobile CTA bar (barra fija inferior en móvil)
- Verificar que "Ring" abre llamada directa
- Verificar que "Begär offert" hace scroll al formulario
- Verificar que no cubre ningún elemento importante

---

## 🟡 Medio — Primera quincena

### 10. Lighthouse audit
- DevTools → Lighthouse → Mobile + Desktop
- Objetivo: Performance ≥85, SEO ≥95, Accessibility ≥90
- Las imágenes ya están optimizadas (WebP/JPG)
- El hero-stuga.jpg tiene preload en `<head>`

### 11. Actualizar sitemap.xml con fechas reales
- Cambiar `<lastmod>2026-06-16</lastmod>` por la fecha de publicación real
- Archivo: `sitemap.xml`

### 12. Verificar Instagram LightWidget
- El widget usa el embed code de LightWidget para @johamarbygg
- Si no carga, revisar si el plan LightWidget está activo
- El fallback (fotos locales) se muestra automáticamente si el widget no carga

### 13. Completar Servicefinder
- URL actual del perfil: https://servicefinder.se/foretag/7080833
- Asegurarse de que el perfil tenga fotos, descripción y está verificado
- Solicitar reseñas a clientes reales

### 14. Resolver discrepancia de fechas
- Schema.org tiene `"foundingDate": "2012"`
- Om Oss dice "Registrerade sedan 2021"
- Decidir cuál usar (2012 = operando desde, 2021 = registro AB) y unificar

### 15. Limpiar archivos sobrantes en assets/
- Eliminar `assets/logo-johamar-full.png` (logo antiguo, ya no referenciado)
- Eliminar `assets/JOHAMAR  AB Nuevo.zip` (ZIP origen, ya extraído)

---

## 🟢 Bajo — Cuando sea oportuno

### 16. Más páginas de municipio (SEO local)
Municipios con potencial: Upplands Väsby, Täby, Solna, Sundbyberg
- Los templates ya existen en `C:\Users\wil16\Downloads\lp-gen\`
- Solo añadir datos en `data-kommun.json` y regenerar
- Añadir URLs al `sitemap.xml`

### 17. Actualizar redes sociales en CLAUDE.md
- Facebook: activo → `https://www.facebook.com/profile.php?id=100091965529718`
- Instagram: @johamarbygg (LightWidget ya conectado)
- Ambas URL están correctas en el sitio

### 18. Añadir Google Review link real
- El botón "Lämna ett omdöme på Google" usa URL `https://g.page/r/CeP5kmNfpg7SEBM/review`
- Verificar que este link sigue activo una vez el perfil de Google Business esté completo

### 19. Datos pendientes de actualizar (de CLAUDE.md)
- Facebook: Ya tiene URL real (`100091965529718`)
- Instagram: Ya conectado (@johamarbygg)
- Verificar que no quede ningún placeholder de datos reales

---

## Checklist de publicación final

- [ ] FormSubmit activado (email de confirmación aceptado)
- [ ] Dominio johamarbygg.se apuntando al hosting
- [ ] HTTPS activo en el dominio
- [ ] GA4 ID real en script.js
- [ ] Search Console verificado
- [ ] Sitemap enviado
- [ ] Formulario probado en móvil y desktop
- [ ] WhatsApp funcional (abre conversación con mensaje)
- [ ] Llamada funcional desde el header y mobile CTA
- [ ] Instagram widget cargando en producción
- [ ] Servicefinder perfil completo con reseñas
