import { Injectable } from '@angular/core';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IVoteBody } from '../interfaces/IVote';
@Injectable()
export class VoteApi {
  constructor(private httpRequestService: HttpRequestService) {}

  async voteOnSection(requestBody: IVoteBody): Promise<any> {
    const response = await this.httpRequestService.sendHttpRequest(
      `${API_URL}/votes`,
      'POST',
      requestBody
    );
    return response;
  }
}
