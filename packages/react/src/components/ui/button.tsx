export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: ButtonProps) => {
  return (
    <button className="k-inline-flex k-items-center k-justify-center k-whitespace-nowrap k-rounded-md k-text-sm k-font-medium k-ring-offset-emerald-600 k-transition-colors focus-visible:k-outline-none focus-visible:ring-2 focus-visible:k-ring-emerald-600 focus-visible:k-ring-offset-2 k-bg-emerald-600 k-text-white k-h-8 k-px-4 k-py-2 hover:k-bg-emerald-600/90 k-cursor-pointer k-border-0 disabled:k-pointer-events-none disabled:k-opacity-50">
      {props.children}
    </button>
  );
};
