import { Injectable } from '@angular/core';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import {
  ICreateSectionRequest,
  ICreateSectionResponse,
  IGetAllSectionsResponse,
} from '../interfaces/ISection';
@Injectable()
export class SectionApi {
  constructor(private httpRequestService: HttpRequestService) {}

  async createSection(
    requestBody: ICreateSectionRequest
  ): Promise<ICreateSectionResponse> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${API_URL}/section`,
      'POST',
      requestBody
    );
    return response;
  }

  async getAllSections(userId: number): Promise<IGetAllSectionsResponse[]> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${API_URL}/section?userId=${userId}`,
      'GET'
    );
    return response;
  }
}
