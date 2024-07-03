import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import { IVoteBody } from '../interfaces/IVote';
import { VoteApi } from './vote.api';

describe('VoteApi', () => {
  let service: VoteApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoteApi, HttpRequestService]
    });

    service = TestBed.inject(VoteApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should vote on a section', async () => {
    const mockRequest: IVoteBody = {
      sectionId: 1,
      userId: 1,
      vote: true,
    };
    const mockResponse = { success: true };

    service.voteOnSection(mockRequest).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/votes`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should handle HTTP error', async () => {
    const mockRequest: IVoteBody = {
      sectionId: 1,
      userId: 1,
      vote: true,
    };
    const errorMessage = 'Internal Server Error';
    const errorStatus = 500;

    service.voteOnSection(mockRequest).catch((error) => {
      expect(error.status).toEqual(errorStatus);
    });

    const req = httpTestingController.expectOne(`${API_URL}/votes`);
    req.error(new ErrorEvent('Internal Server Error'), { status: errorStatus, statusText: errorMessage });
  });
});