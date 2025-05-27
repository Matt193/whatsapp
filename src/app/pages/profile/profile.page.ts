import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'; // Ajusta la ruta
import { User } from '../../models/user.model'; // Ajusta la ruta
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser$: Observable<User | undefined>; // O User | null si tu servicio puede devolver null

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.currentUser$ = this.authService.getCurrentUserDocument();
  }

  ngOnInit() {
    // Puedes usar el observable directamente en el template con | async
    // o suscribirte aquí si necesitas la data en el TS para otra lógica.
    // this.currentUser$.subscribe(user => {
    //   if (user) {
    //     console.log('Usuario del perfil:', user);
    //   }
    // });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, cerrar sesión',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Cerrando sesión...' });
            await loading.present();
            try {
              await this.authService.logout();
              await loading.dismiss();
              // Redirigir a la página de login y limpiar el historial de navegación de tabs
              this.router.navigate(['/auth/login'], { replaceUrl: true });
            } catch (error) {
              await loading.dismiss();
              console.error('Error al cerrar sesión:', error);
              const errorAlert = await this.alertCtrl.create({
                header: 'Error',
                message: 'No se pudo cerrar la sesión. Inténtalo de nuevo.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}