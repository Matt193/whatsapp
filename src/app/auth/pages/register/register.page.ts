import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular'; // Para feedback al usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  async onRegister(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    if (form.value.password_1 !== form.value.password_2) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const loading = await this.loadingCtrl.create({ message: 'Registrando...' });
    await loading.present();

    try {
      await this.authService.register({
        email: form.value.email,
        password_1: form.value.password_1,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phone: form.value.phone,
      });
      await loading.dismiss();
      // Opcional: Mostrar un mensaje de éxito
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigateByUrl('/auth/login'); // Redirigir a login
    } catch (error: any) {
      await loading.dismiss();
      this.isLoading = false;
      // Mapear errores de Firebase a mensajes amigables
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Este correo electrónico ya está en uso.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'El correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
          break;
        default:
          this.errorMessage = 'Ocurrió un error durante el registro. Intenta de nuevo.';
      }
      console.error(error);
    }
  }
}