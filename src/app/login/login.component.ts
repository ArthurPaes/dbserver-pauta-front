import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApi } from '../core/api/app/auth.api';
import { IRequestlogin } from '../core/api/interfaces/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authApi: AuthApi,
    private toast: ToastrService
  ) {}
  public login: IRequestlogin = { email: '', password: '' };

  async onLoginInClick(): Promise<void> {
    try {
      const response = await this.authApi.authenticateUser(this.login);
      this.toast.success('Login efetuado com sucesso');
      this.router.navigate(['/pautas']);
    } catch (error: any) {
      this.toast.error(error.error);
    }
  }

  onSignUpClick(): void {
    this.router.navigate(['/sign-up']);
  }
}
