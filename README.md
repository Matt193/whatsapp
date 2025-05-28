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

## 💻 Pila Tecnológica

* **Framework Principal:** [Ionic](https://ionicframework.com/) (v6/v7+) con [Angular](https://angular.io/) (v15/v16+)
* **Desarrollo Móvil Nativo:** [Capacitor](https://capacitorjs.com/)
    * `@capacitor/push-notifications`: Para tokens FCM y recepción de notificaciones.
    * `@capacitor/camera`: Para tomar fotos y seleccionar de la galería.
    * `@capacitor/geolocation`: (Para futura funcionalidad de compartir ubicación).
    * `@capacitor-community/video-recorder`: (Para futura funcionalidad de grabar videos).
    * `@capawesome/capacitor-file-picker`: (Para futura funcionalidad de adjuntar archivos).
    * `@capacitor-voice-recorder`: (Para futura funcionalidad de grabar audio).
* **Backend (BaaS):**
    * **Firebase:**
        * Authentication: Para registro e inicio de sesión de usuarios.
        * Firestore: Para perfiles de usuario, lista de contactos.
        * Realtime Database: Para mensajes de chat en tiempo real.
        * Firebase Cloud Messaging (FCM): Para el sistema de notificaciones push.
    * **Supabase:**
        * Storage: Para almacenar archivos multimedia (imágenes de chat, fotos de perfil, etc.).
* **Mapas (Placeholder):**
    * `mapbox-gl`: (Para futura funcionalidad de mostrar mapas para ubicación).
* **API Externa para Notificaciones:**
    * Endpoint: `https://ravishing-courtesy-production.up.railway.app/notifications` (para enviar notificaciones push).
    * Autenticación para la API: `https://ravishing-courtesy-production.up.railway.app/user/login`.
* **Gestión de Estado (Implícita):** RxJS para programación reactiva.
* **UI:** Componentes Ionic.

## ⚙️ Configuración del Proyecto

### Prerrequisitos

* Node.js (v18+ recomendado)
* npm (v9+ recomendado) o Yarn
* Ionic CLI (`npm install -g @ionic/cli`)
* Capacitor CLI (`npm install -g @capacitor/cli`)
* Android Studio (para desarrollo Android)
* Xcode (para desarrollo iOS en macOS)

### Pasos de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://<tu-repositorio-github>.git
    cd <nombre-del-directorio-del-proyecto>
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Configuración de Firebase:**
    * Ve a la [Consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto (o usa uno existente).
    * Registra una aplicación web en tu proyecto Firebase para obtener la configuración.
    * Registra tus aplicaciones Android e iOS si vas a compilar para nativo.
        * Para **Android**: Añade el archivo `google-services.json` descargado de Firebase a la carpeta `android/app/`.
        * Para **iOS**: Añade el archivo `GoogleService-Info.plist` descargado de Firebase a tu proyecto Xcode en la carpeta `ios/App/App/`.
    * Copia tu objeto de configuración de Firebase en los archivos de entorno:
        * `src/environments/environment.ts`
        * `src/environments/environment.prod.ts`
        Bajo la propiedad `firebaseConfig` (o como la hayas nombrado):
        ```typescript
        export const environment = {
          production: false,
          firebaseConfig: {
            apiKey: "TU_API_KEY",
            authDomain: "TU_AUTH_DOMAIN",
            projectId: "TU_PROJECT_ID",
            storageBucket: "TU_STORAGE_BUCKET_FIREBASE", // Storage de Firebase
            messagingSenderId: "TU_MESSAGING_SENDER_ID",
            appId: "TU_APP_ID"
          },
          // ... otras configuraciones como Supabase
        };
        ```
    * Habilita los servicios de Firebase que usarás: Authentication (Email/Password), Firestore, Realtime Database, y Cloud Messaging.

4.  **Configuración de Supabase:**
    * Ve a [Supabase.com](https://supabase.com/), crea un proyecto.
    * En la configuración de tu proyecto Supabase, ve a "API" y copia tu **URL del Proyecto** y tu clave **`anon` `public`**.
    * Ve a "Storage" y crea un nuevo Bucket (ej. `chat_images`). Configura las políticas de acceso (ver discusión anterior sobre políticas para permitir subidas de
