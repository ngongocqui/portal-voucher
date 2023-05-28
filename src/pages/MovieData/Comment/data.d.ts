import { MovieItem } from '@/pages/MovieData/Movie/data';
import { UserItem } from '@/pages/Admin/User/data';

export interface CommentItem {
  createdAt: string;
  id: string;
  movie: MovieItem;
  sender: UserItem;
  receiver: UserItem;
  message: string;
  updatedAt: string;
  parent: CommentItem;
}

export interface QueryComment {
  data: CommentItem[];
  total: number;
  success: boolean;
}
