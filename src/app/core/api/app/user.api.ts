import { Injectable } from '@angular/core';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IResponseLogin } from '../interfaces/ILogin';
import { ICreateUserRequest } from '../interfaces/INewUser';
@Injectable()
export class UserApi {
  constructor(private httpRequestService: HttpRequestService) {}

  async createUser(requestBody: ICreateUserRequest): Promise<IResponseLogin> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${API_URL}/user`,
      'POST',
      requestBody
    );
    return response;
  }
}
