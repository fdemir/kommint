import { Item } from "./item";
import { CommentItem } from "../type";
import { Form } from "./form";
import { useKommint } from "src/providers/kommint";
import { useComments } from "../services/comment";

interface CommentsProps {
  uid: string;
  appId?: string;
}

export const Comments = (props: CommentsProps) => {
  const { appId } = useKommint();
  const targetAppid = props.appId || appId;

  const { data, error, updateData } = useComments(targetAppid, props.uid);

  const handleSubmit = async (newComment: CommentItem) =>
    updateData([newComment, ...(data || [])]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="k-flex k-flex-col k-gap-4">
      <Form onSubmit={handleSubmit} appId={targetAppid} uid={props.uid} />
      <div className="k-flex k-flex-col k-gap-2">
        {data?.map((item, index) => <Item key={index} data={item} />)}
      </div>
    </div>
  );
};
