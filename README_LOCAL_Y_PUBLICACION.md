# Clon local - guia de uso y publicacion

## Como verlo local

Desde esta carpeta:

```bash
cd /Users/fvg/Documents/Codex/2026-05-06/fijate-q-con-claude-code-tiene/trustpilot-clone
python3 -m http.server 4177
```

Abrir:

```text
http://127.0.0.1:4177/review/julibenutti.com/
```

La raiz `http://127.0.0.1:4177/` redirige a esa ruta.

Para cortar el servidor: `Control + C` en esa terminal.

## Que contiene

- `index.html`: redireccion local a `/review/julibenutti.com/`.
- `review/julibenutti.com/index.html`: pagina de empresa, siguiendo la forma de Trustpilot.
- `users/index.html`: perfiles locales de usuarios con sus opiniones.
- `assets/trustpilot/`: assets locales que usa el HTML.

No hay backend, login real, formularios reales, base de datos ni tracking.

## Antes de subirlo publico

Si se sube publico, revisar:

- Marca y permisos: confirmar que tenes derecho a usar logos, nombres, UI y copy.
- Dominio: idealmente usar un dominio/subdominio que no confunda al visitante.
- Transparencia: si es experimento, conviene marcarlo como test o entorno experimental.
- Datos personales: no agregar formularios que capturen datos salvo que haya politicas y seguridad.
- Reviews/copy: evitar publicar reseñas reales o textos copiados si no tenes permiso.
- SEO/indexacion: decidir si queres indexar o bloquear bots.

## Si queres bloquear indexacion

Agregar un `robots.txt` con:

```text
User-agent: *
Disallow: /
```

Y en el `<head>` de `index.html`:

```html
<meta name="robots" content="noindex,nofollow">
```

## Si queres permitir indexacion

No agregar `robots.txt` bloqueante ni meta `noindex`.

Revisar antes:

- title
- description
- canonical
- Open Graph
- favicon
- contenido visible
- que el dominio sea correcto

## Vercel

El proyecto ya incluye `vercel.json` para hosting estatico:

- `/` redirige a `/review/julibenutti.com/index.html`.
- `/review/julibenutti.com` reescribe al HTML de la pagina.
- `/users?id=...&review=...` reescribe al perfil local.
- `profiles.js` va con `Cache-Control: no-store` para evitar que home y perfiles queden desincronizados por cache.
- `X-Robots-Tag: noindex, nofollow` y `robots.txt` bloquean indexacion accidental.

Deploy preview recomendado:

```bash
npx vercel --yes
```

Deploy productivo, solo cuando este OK:

```bash
npx vercel --prod --yes
```

Si se conecta dominio propio tipo `trutspilot.com`, probar despues:

```text
https://trutspilot.com/
https://trutspilot.com/review/julibenutti.com
https://trutspilot.com/users?id=6a1ef2a34a5f81e0477f799c&review=6a1ef2c59670d8bbb5bd8da2
```

## Opciones simples para subirlo vos

### Cloudflare Pages

Subir la carpeta `trustpilot-clone` como proyecto de Pages o usar Wrangler con direct upload.

El dominio propio se conecta desde Cloudflare Pages > Custom domains. Para dominio apex, Cloudflare suele requerir que el dominio este agregado como zona en la misma cuenta.

### Hosting estatico comun

Subir todo el contenido de `trustpilot-clone/` al directorio publico del hosting, por ejemplo `public_html`.

El archivo `index.html` tiene que quedar en la raiz publica.

## Checklist final

- Abrir desktop y mobile antes de publicar.
- Verificar que carguen los assets.
- Verificar que no haya links reales que manden a lugares incorrectos.
- Decidir si va con indexacion o `noindex`.
- Confirmar permisos de marca/copy.
- Probar la URL publica despues del deploy.
