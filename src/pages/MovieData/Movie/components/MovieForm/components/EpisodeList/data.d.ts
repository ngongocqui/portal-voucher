export interface Episode {
  id: string;
  code: string;
  name: string;
}

export interface CreateManyEpisode {
  bulk: CreateEpisode[];
}

export interface CreateEpisode {
  code: string;
  name: string;
  movie?: string;
}

export interface UpdateEpisode {
  code: string;
  name: string;
  movie: string;
}

export interface QueryEpisode {
  data: Episode[];
  total: number;
  success: boolean;
}
