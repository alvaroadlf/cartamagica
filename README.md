# La Carta Mágica 🎅🏼✨

Una aplicación mágica de Navidad para escribir cartas a Papá Noel, construida con Next.js y mucho cariño desde Pamplona.

## 🚀 Características

- ✨ Animaciones mágicas con Framer Motion
- 🎄 Efecto de nieve cayendo
- 📧 Envío real de emails usando Resend
- 💌 Animación de sobre que se dobla y vuela
- 🎨 Diseño hermoso con fuente manuscrita (Caveat)
- 📱 Totalmente responsive

## 🛠️ Instalación

1. **Instala las dependencias**:
```bash
npm install
```

2. **Configura Resend para enviar emails**:

### Obtén tu API Key de Resend (Gratis)

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Verifica tu email
3. En el dashboard, ve a **API Keys**
4. Crea una nueva API key y cópiala

### Configura las variables de entorno

```bash
# Crea el archivo .env.local
cp .env.local.example .env.local
```

Edita `.env.local` y añade tu API key y email:
```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL=alvaro.adlf@gmail.com
```

> [!IMPORTANT]
> **Modo de prueba de Resend**: En el plan gratuito sin dominio verificado, solo puedes enviar emails a la dirección de email que usaste para registrarte en Resend. Para enviar a otras direcciones, necesitas [verificar un dominio](https://resend.com/domains).

**Plan gratuito de Resend:**
- ✅ 100 emails por día gratis
- ✅ 3,000 emails por mes gratis
- ✅ Sin tarjeta de crédito requerida

## 🏃‍♂️ Uso

### Modo desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
cartamagica/
├── app/
│   ├── actions.ts       # Server action para enviar emails
│   ├── globals.css      # Estilos globales y animaciones
│   ├── layout.tsx       # Layout raíz con fuentes
│   └── page.tsx         # Componente principal de la aplicación
├── .env.local          # Variables de entorno (no commitear)
├── .env.local.example  # Ejemplo de variables de entorno
├── next.config.js      # Configuración de Next.js
├── package.json        # Dependencias
└── README.md           # Este archivo
```

## 🎨 Tecnologías

- **Next.js 14+** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Resend** - Servicio de email para Next.js

## 📝 Personalización

### Cambiar el destinatario del email

Edita `app/actions.ts` y cambia el campo `to`:
```typescript
to: ['tu-email@ejemplo.com'],
```

### Usar tu propio dominio (Producción)

Una vez que tengas un dominio verificado en Resend, cambia el campo `from`:
```typescript
from: 'Carta Mágica <cartas@tudominio.com>',
```

## ❓ Solución de Problemas

### El email no se envía
1. Verifica que tu API key esté correctamente configurada en `.env.local`
2. Asegúrate de que la API key comience con `re_`
3. Reinicia el servidor de desarrollo después de cambiar `.env.local`
4. Revisa la consola del servidor para ver mensajes de error

## 🎄 Hecho con cariño

Desarrollado en Pamplona con mucho cariño ❤️

## 📄 Licencia

MIT
