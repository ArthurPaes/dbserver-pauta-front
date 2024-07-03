import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from '../core/api/app/user.api';
import { ICreateUserRequest } from '../core/api/interfaces/INewUser';
import { preventNonNumericCharacters } from '../utils/utilFunctions';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private router: Router,
    private userApi: UserApi,
    private toast: ToastrService
  ) {}
  public newUserData: ICreateUserRequest = {
    name: '',
    cpf: '',
    email: '',
    password: '',
  };

  public preventNonNumeric = preventNonNumericCharacters;

  async onCreateAccountClick(): Promise<void> {
    try {
      await this.userApi.createUser(this.newUserData);
      this.toast.success('Conta criada com sucesso!');
    } catch (error) {
      this.toast.error('Erro ao criar conta');
    }
    this.router.navigate(['/login']);
  }
}
