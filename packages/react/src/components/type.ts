export interface CommentItem {
  id: string;
  text: string;
  date: Date;
}

export type CommentResponse = {
  page: number;
  limit: number;
  total_rows: number;
  total_pages: number;
  rows: CommentItem[];
};

export type CreateCommentRequestPayload = {
  text: string;
};
