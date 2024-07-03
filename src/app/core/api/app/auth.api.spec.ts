import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IResponseLogin } from '../interfaces/ILogin';
import { AuthApi } from './auth.api';

describe('AuthApi', () => {
  let service: AuthApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApi, HttpRequestService],
    });

    service = TestBed.inject(AuthApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('@UserData');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and store data in localStorage', async () => {
    const mockRequest = { email: 'test@example.com', password: 'password123' };
    const mockResponse: IResponseLogin = {
      cpf: '123456789',
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    };

    service.authenticateUser(mockRequest).then((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('@UserData')).toEqual(
        JSON.stringify(mockResponse)
      );
    });

    const req = httpTestingController.expectOne(`${API_URL}/auth`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should handle HTTP error', async () => {
    const mockRequest = { email: 'test@example.com', password: 'password123' };
    const errorMessage = 'Unauthorized';
    const errorStatus = 401;

    service.authenticateUser(mockRequest).catch((error) => {
      expect(error.status).toEqual(errorStatus);
    });

    const req = httpTestingController.expectOne(`${API_URL}/auth`);
    req.error(new ErrorEvent('Unauthorized'), {
      status: errorStatus,
      statusText: errorMessage,
    });
  });
});
