import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthApi } from '../core/api/app/auth.api';
import { IResponseLogin } from '../core/api/interfaces/ILogin';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let authApiSpy: jasmine.SpyObj<AuthApi>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    authApiSpy = jasmine.createSpyObj('AuthApi', ['authenticateUser']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: AuthApi, useValue: authApiSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login with default values', () => {
    const expectedLogin = { email: '', password: '' };
    expect(component.login).toEqual(expectedLogin);
  });

  it('should navigate to /sign-up on onSignUpClick', () => {
    component.onSignUpClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/sign-up']);
  });

  it('should authenticate user and handle success on onLoginInClick', async () => {
    const mockResponse: IResponseLogin = {
      name: 'Test User',
      email: 'test@example.com',
      cpf: '123456789',
      id: 1,
    };
    authApiSpy.authenticateUser.and.returnValue(Promise.resolve(mockResponse));
    spyOn(localStorage, 'setItem');

    await component.onLoginInClick();

    expect(authApiSpy.authenticateUser).toHaveBeenCalledWith(component.login);
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Login efetuado com sucesso'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pautas']);
  });

  it('should handle error on onLoginInClick', async () => {
    const mockError = { error: 'Invalid credentials' };
    authApiSpy.authenticateUser.and.returnValue(Promise.reject(mockError));

    await component.onLoginInClick();

    expect(authApiSpy.authenticateUser).toHaveBeenCalledWith(component.login);
    expect(toastrSpy.error).toHaveBeenCalledWith(mockError.error);
  });
});
