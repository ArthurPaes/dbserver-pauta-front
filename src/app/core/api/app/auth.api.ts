import { Injectable } from '@angular/core';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IResponseLogin } from '../interfaces/ILogin';
@Injectable()
export class AuthApi {
  constructor(private httpRequestService: HttpRequestService) {}

  async authenticateUser(requestBody: any): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${API_URL}/auth`,
      'POST',
      requestBody
    );
    localStorage.setItem('@UserData', JSON.stringify(response));
    return response;
  }
}
