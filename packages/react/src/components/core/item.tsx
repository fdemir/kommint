import { timeAgo } from "src/utils/date";

interface ItemProps {
  data: {
    date: Date;
    text: string;
  };
}

export const Item = ({ data }: ItemProps) => {
  const { date, text } = data;

  return (
    <div className="k-flex k-flex-col k-gap-1">
      <div className="k-flex k-items-center k-gap-2">
        <span className="k-text-xs k-text-gray-500">{timeAgo(date)}</span>
      </div>
      <p className="k-m-0">{text}</p>
    </div>
  );
};
