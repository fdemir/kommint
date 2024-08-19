export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  return (
    <button className="k-inline-flex k-items-center k-gap-2 k-rounded k-border k-border-emerald-600 k-bg-emerald-600 k-px-8 k-text-white hover:k-bg-emerald-700 focus:k-outline-none focus:k-ring active:k-text-emerald-600 active:k-bg-transparent active:k-ring-offset-2 disabled:k-cursor-not-allowed disabled:k-opacity-50">
      <span className="k-text-sm k-font-medium"> {props.children} </span>
    </button>
  );
};
