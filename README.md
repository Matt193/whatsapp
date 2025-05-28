# jitCall / wasaaa - Aplicación de Mensajería en Tiempo Real

jitCall (o wasaaa) es una aplicación móvil de mensajería instantánea, similar a WhatsApp, desarrollada con Ionic y Angular. Permite a los usuarios registrarse, gestionar contactos, chatear en tiempo real, y (en futuras versiones) realizar videollamadas.

## 🚀 Características Principales

* **Autenticación de Usuarios:**
    * Registro de nuevos usuarios (Nombre, apellido, correo, teléfono, contraseña).
    * Inicio de sesión con correo y contraseña.
    * Gestión de sesión y protección de rutas mediante Guards.
* **Gestión de Perfil (Básica):**
    * Visualización de información del perfil del usuario.
    * Cierre de sesión.
    * _(Funcionalidad futura: editar nombre, subir foto de perfil)._
* **Gestión de Contactos:**
    * Listar contactos del usuario.
    * Agregar nuevos contactos buscando usuarios existentes en la plataforma por número de teléfono.
    * Eliminar contactos.
* **Chat en Tiempo Real:**
    * Conversaciones uno a uno.
    * Envío y recepción de mensajes de texto.
    * Envío y recepción de mensajes con imágenes (usando Supabase Storage y Capacitor Camera).
    * Visualización de mensajes diferenciando remitente y destinatario.
    * Timestamps en los mensajes.
    * Scroll automático a los mensajes más recientes.
    * _(Funcionalidad futura: mensajes de voz, envío de archivos, compartir ubicación, emojis, confirmaciones de lectura)._
* **Notificaciones Push (Configuración Inicial):**
    * Registro del token FCM del dispositivo móvil al registrarse o iniciar sesión.
    * Almacenamiento del token FCM en Firestore.
    * _(Funcionalidad futura: envío de notificaciones push para nuevos mensajes y llamadas usando API externa)._
* **Videollamadas (Placeholder):**
    * Botones de UI para iniciar videollamadas y llamadas de voz.
    * _(Funcionalidad futura: Integración con Jitsi SDK para videollamadas)._
* **Almacenamiento de Archivos Multimedia:**
    * Uso de Supabase Storage para imágenes de chat.
    * _(Funcionalidad futura: para fotos de perfil, mensajes de voz, otros archivos)._

