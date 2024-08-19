export interface CommentItem {
  id: string;
  text: string;
  date: Date;
}

export type CommentResponse = CommentItem[];

export type CreateCommentRequestPayload = {
  text: string;
};
