import React from "react";

type CustomButtonProps = {
  replaceClass?: boolean;
  variant?: "primary" | "secondary";
};

export type ButtonProps = CustomButtonProps &
  React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    replaceClass = false,
    children,
    className = "",
    variant = "primary",
    ...props
  },
  ref
) {
  if (variant === "secondary") {
    return (
      <SecondaryBtn
        replaceClass={replaceClass}
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </SecondaryBtn>
    );
  }

  return (
    <button
      className={
        replaceClass
          ? className
          : `flex flex-row items-center justify-center bg-blue-700 hover:bg-blue-700/80 focus:ring-2 focus:ring-blue-700 focus:ring-offset-[3px] active:ring-2 active:ring-blue-700 active:ring-offset-[3px] disabled:cursor-not-allowed disabled:bg-blue-700/80 disabled:ring-blue-700/80  transition-opacity duration-300 text-center text-white rounded-md ${className}`
      }
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;

export const SecondaryBtn = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>(function Button({ replaceClass, children, className, ...props }, ref) {
  return (
    <button
      className={
        replaceClass
          ? className
          : `flex flex-row items-center justify-center text-blue-700 .text-blue-700-normal  ring-1 ring-blue-700  bg-white hover:ring-0 hover:bg-thirdGray focus:ring-2 active:ring-2 disabled:cursor-not-allowed  transition-all duration-300 text-center rounded-md ${className}`
      }
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
