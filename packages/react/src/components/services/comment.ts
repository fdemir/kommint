import { config } from "src/utils/api";
import { CommentResponse, CreateCommentRequestPayload } from "../type";
import { useMutation, useQuery } from "../hooks/useFetch";

export function useComments(appId: string, uid: string) {
  return useQuery<CommentResponse>(
    `${config.baseURL}/comments/${appId}/${uid}`,
    {
      method: "GET",
    }
  );
}

export function useCreateComment(appId: string, uid: string) {
  return useMutation<CreateCommentRequestPayload>(
    `${config.baseURL}/comments/${appId}/${uid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
