// signup.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  error: any = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.email, this.password);
    await loading.dismiss();

    if (user !== 'Error In Registration') {
      this.showAlert('Registration  Successful', 'Explore...');
      this.router.navigateByUrl('/movies', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Invalid Email');
    }
  }
}
