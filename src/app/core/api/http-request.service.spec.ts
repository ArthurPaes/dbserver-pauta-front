import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpRequestService } from './http-request.service';

describe('HttpRequestService', () => {
  let service: HttpRequestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpRequestService],
    });

    service = TestBed.inject(HttpRequestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle GET request', async () => {
    const path = '/api/data';
    const expectedData = { message: 'GET request successful' };

    service.sendHttpRequest(path, 'GET').then((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });

  it('should handle POST request', async () => {
    const path = '/api/data';
    const requestData = { message: 'POST request data' };
    const expectedData = { message: 'POST request successful' };

    service.sendHttpRequest(path, 'POST', requestData).then((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(requestData);
    req.flush(expectedData);
  });

  it('should handle PUT request', async () => {
    const path = '/api/data/1';
    const expectedData = { message: 'PUT request successful' };

    service.sendHttpRequest(path, 'PUT').then((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('PUT');
    req.flush(expectedData);
  });

  it('should handle DELETE request', async () => {
    const path = '/api/data/1';
    const expectedData = { message: 'DELETE request successful' };

    service.sendHttpRequest(path, 'DELETE').then((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(path);
    expect(req.request.method).toEqual('DELETE');
    req.flush(expectedData);
  });

  it('should handle HTTP error', async () => {
    const path = '/api/data';
    const errorMessage = 'Unauthorized';
    const errorStatus = 401;

    service.sendHttpRequest(path, 'GET').catch((error) => {
      expect(error.status).toEqual(errorStatus);
    });

    const req = httpTestingController.expectOne(path);
    req.error(new ErrorEvent('Unauthorized'), { status: errorStatus, statusText: errorMessage });
  });
});