import { Item } from "./item";
import { CommentItem } from "../type";
import { Form } from "./form";
import { useKommint } from "src/providers/kommint";
import { useComments } from "../services/comment";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "src/utils/style";

interface CommentsProps {
  uid: string;
  appId?: string;
}

export const Comments = (props: CommentsProps) => {
  const { appId } = useKommint();
  const targetAppid = props.appId || appId;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, addComment } = useComments(
    targetAppid,
    props.uid,
    currentPage
  );

  const handleSubmit = async (newComment: Omit<CommentItem, "id">) => {
    addComment(newComment as CommentItem);
  };

  const handleLoadMoreComments = () => {
    if (data[0]?.total_pages === currentPage) {
      return;
    }

    setCurrentPage((c) => c + 1);
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="k-flex k-flex-col k-gap-4">
      <Form onSubmit={handleSubmit} appId={targetAppid} uid={props.uid} />
      <div className="k-flex k-flex-col k-gap-2">
        {data.map((item) =>
          item.rows.map((row, index) => <Item key={index} data={row} />)
        )}
      </div>
      {data.length > 0 && (
        <div className="k-flex k-justify-center">
          <button
            className={cn(
              "k-w-full k-text-center k-block k-py-2 k-cursor-pointer k-border-0 k-bg-transparent",
              {
                "k-pointer-events-none k-opacity-50":
                  data[0]?.total_pages === currentPage,
              }
            )}
            role="button"
            onClick={handleLoadMoreComments}
          >
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
};
