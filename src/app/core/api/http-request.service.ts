import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  async sendHttpRequest(
    path: string,
    method: string,
    data?: Record<string, any>
  ): Promise<any> {
    const headers = new HttpHeaders({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    });
    try {
      switch (method) {
        case 'GET': {
          return await lastValueFrom(this.httpClient.get(path, { headers }));
        }
        case 'POST': {
          return await lastValueFrom(
            this.httpClient.post(path, data, { headers })
          );
        }
        case 'PUT': {
          return await lastValueFrom(this.httpClient.put(path, { headers }));
        }
        case 'DELETE': {
          return await lastValueFrom(this.httpClient.delete(path, { headers }));
        }
      }
    } catch (error) {
      this.handleHttpError(error as HttpErrorResponse);
      throw error;
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
