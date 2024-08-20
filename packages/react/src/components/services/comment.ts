import { config } from "src/utils/api";
import {
  CommentItem,
  CommentResponse,
  CreateCommentRequestPayload,
} from "../type";
import { useMutation, useQuery } from "../hooks/useFetch";
import { useEffect, useState, useCallback, useMemo } from "react";

export function useComments(appId: string, uid: string, page: number) {
  const [pages, setPages] = useState<Record<string, CommentResponse>>({});
  const result = useQuery<CommentResponse>(
    `${config.baseURL}/comments/${appId}/${uid}?page=${page}`,
    {
      method: "GET",
    }
  );

  const addComment = useCallback(
    (data: CommentItem) => {
      data.id = crypto.randomUUID();
      setPages((prev) => ({
        ...prev,
        [0]: {
          ...prev[0]!,
          rows: [data, ...(prev[0]?.rows || [])],
        },
      }));
    },
    [setPages]
  );

  useEffect(() => {
    if (result.data) {
      setPages((prev) => ({
        ...prev,
        [result.data?.page!]: result.data,
      }));
    }
  }, [result.data, setPages]);

  return useMemo(
    () => ({
      data: Object.values(pages),
      error: result.error,
      addComment,
    }),
    [pages, result.error, addComment]
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
