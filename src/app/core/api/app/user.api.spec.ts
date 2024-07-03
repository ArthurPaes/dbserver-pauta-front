import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IResponseLogin } from '../interfaces/ILogin';
import { ICreateUserRequest } from '../interfaces/INewUser';
import { UserApi } from './user.api';

describe('UserApi', () => {
  let service: UserApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserApi, HttpRequestService],
    });

    service = TestBed.inject(UserApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', async () => {
    const mockRequest: ICreateUserRequest = {
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const mockResponse: IResponseLogin = {
      cpf: '12345678900',
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    service.createUser(mockRequest).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/user`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should handle HTTP error', async () => {
    const mockRequest: ICreateUserRequest = {
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const errorMessage = 'Internal Server Error';
    const errorStatus = 500;

    service.createUser(mockRequest).catch((error) => {
      expect(error.status).toEqual(errorStatus);
    });

    const req = httpTestingController.expectOne(`${API_URL}/user`);
    req.error(new ErrorEvent('Internal Server Error'), {
      status: errorStatus,
      statusText: errorMessage,
    });
  });
});
