import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if @UserData exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('userData');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivate).toBeTrue();
  });

  it('should not allow activation if @UserData does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    spyOn(router, 'navigate');
    const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});