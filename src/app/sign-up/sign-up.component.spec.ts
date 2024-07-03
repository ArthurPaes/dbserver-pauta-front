import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserApi } from '../core/api/app/user.api';
import { ICreateUserRequest } from '../core/api/interfaces/INewUser';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userApiSpy: jasmine.SpyObj<UserApi>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userApiSpy = jasmine.createSpyObj('UserApi', ['createUser']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserApi, useValue: userApiSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial newUserData with empty fields', () => {
    const expectedUserData: ICreateUserRequest = {
      name: '',
      cpf: '',
      email: '',
      password: '',
    };
    expect(component.newUserData).toEqual(expectedUserData);
  });

  it('should navigate to /login on successful account creation', fakeAsync(async () => {
    userApiSpy.createUser.and.returnValue(
      Promise.resolve({ cpf: '123', email: '123', id: 1, name: '123' })
    );
    await component.onCreateAccountClick();
    tick();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      'Conta criada com sucesso!'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should show error toast on account creation failure', fakeAsync(async () => {
    userApiSpy.createUser.and.returnValue(Promise.reject());
    await component.onCreateAccountClick();
    tick();
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Erro ao criar conta');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
