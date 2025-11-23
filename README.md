# La Carta Mágica 🎅🏼✨

Una aplicación mágica de Navidad para escribir cartas a Papá Noel, construida con Next.js y mucho cariño desde Pamplona.

## 🚀 Características

- ✨ Animaciones mágicas con Framer Motion
- 🎄 Efecto de nieve cayendo
- 📧 Envío real de emails usando Resend
- 💌 Animación de sobre que se dobla y vuela
- 🎨 Diseño hermoso con fuente manuscrita (Caveat)
- 📱 Totalmente responsive
- 🔒 Footer inteligente que se oculta durante la escritura

## 🛠️ Instalación

### 1. Instala las dependencias

```bash
npm install
```

### 2. Configura Resend para enviar emails

#### Crea una cuenta en Resend (Gratis)

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Verifica tu email
3. En el dashboard, ve a **API Keys**
4. Crea una nueva API key y cópiala

#### Configura las variables de entorno

```bash
# Crea el archivo .env.local
cp .env.local.example .env.local
```

Edita `.env.local` y añade tu configuración:

```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL=tu-email@ejemplo.com
```

> [!IMPORTANT]
> **Limitación del plan gratuito**: Sin un dominio verificado, Resend solo permite enviar emails a la dirección que usaste para registrarte. 
> 
> **Para desarrollo/pruebas**: Usa tu email de Resend en la variable `EMAIL`
> 
> **Para producción**: Verifica un dominio en [resend.com/domains](https://resend.com/domains) y actualiza el campo `from` en `app/actions.ts`

**Plan gratuito de Resend:**
- ✅ 100 emails por día gratis
- ✅ 3,000 emails por mes gratis
- ✅ Sin tarjeta de crédito requerida
- ⚠️ Solo puedes enviar a tu propio email sin dominio verificado

### 3. Inicia el servidor

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
cartamagica/
├── app/
│   ├── actions.ts       # Server action para enviar emails con Resend
│   ├── globals.css      # Estilos globales y animaciones
│   ├── layout.tsx       # Layout raíz con fuentes de Google
│   └── page.tsx         # Componente principal de la aplicación
├── .env.local          # Variables de entorno (no commitear)
├── .env.local.example  # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── next.config.js      # Configuración de Next.js
├── package.json        # Dependencias del proyecto
├── postcss.config.mjs  # Configuración de PostCSS
├── tailwind.config.ts  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Este archivo
```

## 🎨 Tecnologías

- **Next.js 14+** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Resend** - Servicio de email para Next.js
- **Google Fonts** - Fuente Caveat para estilo manuscrito

## 📝 Personalización

### Cambiar el destinatario del email

Edita el archivo `.env.local`:

```env
EMAIL=nuevo-email@ejemplo.com
```

> **Nota**: Recuerda que en el plan gratuito sin dominio verificado, solo puedes enviar a tu propio email de Resend.

### Usar tu propio dominio (Producción)

1. Verifica tu dominio en [resend.com/domains](https://resend.com/domains)
2. Edita `app/actions.ts` y cambia el campo `from`:

```typescript
from: 'Carta Mágica <cartas@tudominio.com>',
```

3. Ahora podrás enviar emails a cualquier dirección

## 🚀 Despliegue en Producción

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Añade las variables de entorno:
   - `RESEND_API_KEY`
   - `EMAIL`
4. Despliega

### Otras plataformas

Asegúrate de configurar las variables de entorno en tu plataforma de hosting.

## ❓ Solución de Problemas

### El email no se envía

1. **Verifica las variables de entorno**:
   - Asegúrate de que `.env.local` existe y tiene las variables correctas
   - La API key debe comenzar con `re_`
   - Reinicia el servidor después de cambiar `.env.local`

2. **Error "You can only send testing emails to your own email"**:
   - Esto es normal en el plan gratuito sin dominio
   - Cambia `EMAIL` en `.env.local` a tu email de Resend
   - O verifica un dominio en Resend

3. **Revisa los logs**:
   - Abre la consola del navegador (F12 → Console)
   - Revisa la terminal donde corre `npm run dev`
   - Los errores detallados aparecerán ahí

### El favicon no carga (404)

Esto es normal si no has añadido un `favicon.ico`. No afecta la funcionalidad de la app.

## 🎄 Hecho con cariño

Desarrollado en Pamplona con mucho cariño ❤️

## 📄 Licencia

MIT
