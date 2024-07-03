export interface ICreateSectionRequest {
  name: string;
  description: string;
  expiration: number;
}

export interface ICreateSectionResponse {
  id: number;
  name: string;
  description: string;
  expiration: number;
  start_at: string;
  expired: boolean;
}

export interface IGetAllSectionsResponse {
  start_at: string;
  totalVotes: number;
  votesTrue: number;
  votesFalse: number;
  hasVoted: boolean;
  name: string;
  id: number;
  description: string;
  expiration: number;
  isExpired: boolean;
}
