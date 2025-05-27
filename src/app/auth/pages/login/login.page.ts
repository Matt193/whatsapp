import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async onLogin(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const loading = await this.loadingCtrl.create({ message: 'Iniciando sesión...' });
    await loading.present();

    try {
      await this.authService.login({
        email: form.value.email,
        password_1: form.value.password_1,
      });
      await loading.dismiss();
      // Navegar a la página principal (ej. /tabs/home)
      // Asegúrate que esta ruta esté protegida por un AuthGuard
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } catch (error: any) {
      await loading.dismiss();
      this.isLoading = false;
      // Mapear errores de Firebase a mensajes amigables
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential': // Más genérico para Firebase v9+
          this.errorMessage = 'Correo o contraseña incorrectos.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'El formato del correo no es válido.';
          break;
        default:
          this.errorMessage = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
      }
      console.error(error);
    }
  }
}