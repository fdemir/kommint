import { config } from "../../utils/api";
import { useMutation } from "../hooks/useFetch";
import { useCreateComment } from "../services/comment";
import { CommentItem, CreateCommentRequestPayload } from "../type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FormProps {
  onSubmit: (data: Omit<CommentItem, "id">) => void;

  appId: string;
  uid: string;
}

export const Form = (props: FormProps) => {
  const { mutate } = useCreateComment(props.appId, props.uid);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = new FormData(event.currentTarget);

    props.onSubmit({
      text: formValues.get("text") as string,
      date: new Date(),
    });

    event.currentTarget.reset();

    try {
      mutate({
        text: formValues.get("text") as string,
      });
    } catch (error) {}
  };

  return (
    <form className="k-flex k-gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Write a comment"
        name="text"
        required
        autoComplete="off"
      />
      <Button>Send</Button>
    </form>
  );
};
