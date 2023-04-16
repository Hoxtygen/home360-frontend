import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { mergeClass } from "../lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none  focus:ring-slate-400  dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50  disabled:pointer-events-none  data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-neutral-500 hover:bg-transparent dark:hover:bg-black dark:hover:rounded-sm dark:hover:text-gray-300",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
        xl: "h-14 px-14 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonSizes = ButtonVariantProps["size"];

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, size, variant, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={mergeClass(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        className={mergeClass(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
