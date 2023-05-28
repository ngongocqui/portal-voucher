export interface EpisodeExpand {
  id: string;
  code: string;
  name: string;
  video: string;
}

export interface CreateEpisodeExpand {
  code: string;
  name: string;
  video: string;
  movie: string;
}

export interface UpdateEpisodeExpand {
  code: string;
  name: string;
  video: string;
  movie: string;
}

export interface QueryEpisodeExpand {
  data: EpisodeExpand[];
  total: number;
  success: boolean;
}
