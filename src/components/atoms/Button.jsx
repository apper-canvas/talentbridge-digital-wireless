import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-primary",
    secondary: "border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary",
    outline: "border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-accent to-accent-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-accent",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-error"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-4 py-2.5 text-sm h-11",
    lg: "px-6 py-3 text-base h-12",
    xl: "px-8 py-4 text-lg h-14"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;