// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../../models/user.model'; // Ajusta la ruta si es necesario
import firebase from 'firebase/compat/app'; // Necesario para UserCredential
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // O provéelo en AuthModule
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  // Método de Registro
  async register(userData: {
    email: string;
    password_1: string; // Asegúrate que el nombre coincida con tu formulario
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<firebase.auth.UserCredential> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        userData.email,
        userData.password_1
      );
      if (credential.user) {
        // Preparamos los datos adicionales para Firestore
        const userForFirestore: User = {
          uid: credential.user.uid,
          email: credential.user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          photoURL: '', // Puedes poner una URL por defecto o dejarla vacía
        };
        // Guardar datos adicionales en Firestore
        await this.updateUserData(userForFirestore);
      }
      return credential;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  }

  // Método para guardar/actualizar datos del usuario en Firestore
  private updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, { merge: true }); // merge: true para no sobrescribir todo el documento si ya existe
  }

  // Método de Login
  login(credentials: { email: string; password_1: string; }): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password_1)
      .catch(error => {
        console.error("Error en el login:", error);
        throw error; // Propagar el error
      });
  }

  // Método de Logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      // Aquí podrías limpiar datos locales si es necesario (ej. LocalStorage)
    } catch (error) {
      console.error("Error en el logout:", error);
      throw error;
    }
  }

  // Obtener el estado de autenticación del usuario
  getUserAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  // Obtener datos del usuario actual desde Firestore
  getCurrentUserDocument(): Observable<User | undefined> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(undefined); // o of(null)
        }
      })
    );
  }
}