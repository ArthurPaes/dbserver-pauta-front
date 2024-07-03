import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../../common/constants/globalConstantExample';
import { HttpRequestService } from '../http-request.service';
import {
    ICreateSectionRequest,
    ICreateSectionResponse,
    IGetAllSectionsResponse,
} from '../interfaces/ISection';
import { SectionApi } from './section.api';

describe('SectionApi', () => {
  let service: SectionApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SectionApi, HttpRequestService],
    });

    service = TestBed.inject(SectionApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new section', async () => {
    const mockRequest: ICreateSectionRequest = {
      name: 'New Section',
      description: 'Description of new section',
      expiration: 1,
    };
    const mockResponse: ICreateSectionResponse = {
      id: 1,
      name: 'New Section',
      description: 'Description of new section',
      expiration: 1,
      expired: false,
      start_at: '',
    };

    service.createSection(mockRequest).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/section`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockResponse);
  });

  it('should get all sections for a user', async () => {
    const userId = 1;
    const mockResponse: IGetAllSectionsResponse[] = [
      {
        id: 1,
        name: 'Section 1',
        description: 'Description of Section 1',
        expiration: 0,
        hasVoted: false,
        start_at: '',
        totalVotes: 0,
        votesFalse: 0,
        votesTrue: 0,
        isExpired: false,
      },
      {
        id: 2,
        name: 'Section 2',
        description: 'Description of Section 2',
        expiration: 0,
        hasVoted: false,
        start_at: '',
        totalVotes: 0,
        votesFalse: 0,
        votesTrue: 0,
        isExpired: false,
      },
    ];

    service.getAllSections(userId).then((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${API_URL}/section?userId=${userId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
