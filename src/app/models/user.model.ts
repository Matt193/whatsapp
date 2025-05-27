// src/app/models/user.model.ts
export interface User {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  photoURL?: string; // Opcional, para la foto de perfil
  fcmToken?: string; // Opcional, para notificaciones push
}