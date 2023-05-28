import { MovieItem } from '@/pages/MovieData/Movie/data';
import { UserItem } from '@/pages/Admin/User/data';

export interface CommentChildExpandItem {
  createdAt: string;
  id: string;
  movie: MovieItem;
  sender: UserItem;
  receiver: UserItem;
  message: string;
  updatedAt: string;
}

export interface QueryCommentChildExpand {
  data: CommentChildExpandItem[];
  total: number;
  success: boolean;
}
