'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(name: string, message: string) {
  try {
    // Debug: verificar variables de entorno
    console.log('RESEND_API_KEY configurada:', !!process.env.RESEND_API_KEY);
    console.log('EMAIL configurada:', process.env.EMAIL);

    // Validate inputs
    if (!name || !message) {
      return { success: false, error: 'Nombre y mensaje son requeridos' };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return { success: false, error: 'Configuración de email no disponible' };
    }

    if (!process.env.EMAIL) {
      console.error('EMAIL no está configurada');
      return { success: false, error: 'Email destinatario no configurado' };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Carta Mágica <onboarding@resend.dev>', // Usa tu dominio verificado en producción
      to: [process.env.EMAIL],
      subject: `Carta de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Georgia', serif;
                background-color: #fdfbf7;
                padding: 40px;
                color: #2a0a0a;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 40px;
                border: 4px solid #d4af37;
                box-shadow: 0 0 30px rgba(212, 175, 55, 0.2);
              }
              .header {
                text-align: center;
                color: #8b0000;
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 20px;
              }
              .from {
                font-size: 18px;
                color: #5c4033;
                margin-bottom: 20px;
              }
              .message {
                font-size: 16px;
                line-height: 1.8;
                white-space: pre-wrap;
                padding: 20px;
                background: #fdfbf7;
                border-left: 3px solid #d4af37;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #8b0000;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">🎅🏼 Carta para Papá Noel</div>
              <div class="from"><strong>De:</strong> ${name}</div>
              <div class="message">${message}</div>
              <div class="footer">
                Enviado desde La Carta Mágica ✨<br>
                Hecho en Pamplona con mucho cariño ❤️
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      console.error('Detalles del error:', JSON.stringify(error, null, 2));
      return { success: false, error: `Error al enviar el email: ${error.message || JSON.stringify(error)}` };
    }

    console.log('Email enviado exitosamente:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error en sendEmailAction:', error);
    return { success: false, error: 'Error inesperado al enviar el email' };
  }
}
