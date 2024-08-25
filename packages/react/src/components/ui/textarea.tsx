import * as React from "react";
import { cn } from "src/utils/style";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className="
      k-grid
      k-text-sm
      after:k-px-3.5
      after:k-py-2.5
      after:k-text-inherit
      after:k-whitespace-pre-wrap
      after:k-invisible
      after:k-content-[attr(data-cloned-val)_'_']
      after:k-border
      h-full
      text-area-wrapper
  "
      >
        <textarea
          className="k-flex kw-full k-rounded-md k-border k-border-zinc-950 k-bg-transparent k-px-3 k-py-2 k-text-sm ring-offset-zinc-950 placeholder:text-black/200 focus-visible:k-outline-none focus-visible:k-ring-2 focus-visible:k-ring-emerald-600 focus-visible:k-ring-offset-2 disabled:k-cursor-not-allowed disabled:k-opacity-50 focus:k-ring-0 k-min-h-8 k-appearance-none k-resize-none"
          style={{ gridArea: "1/1/2/2" }}
          name="message"
          id="message"
          onInput={(e) =>
            // @ts-ignore
            (e.target.parentNode.dataset.clonedVal = e.target.value)
          }
          placeholder="Your request..."
          required
          {...props}
        ></textarea>
      </div>
    );
  }
);

export { Textarea };
