import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

let textVariants = cva("font-base", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      body: "leading-7",
      "body-small": "text-sm font-medium leading-none",
      "body-large": "text-lg font-semibold",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TextProps<ComponentType extends ElementType> =
  ComponentPropsWithoutRef<ComponentType> &
    VariantProps<typeof textVariants> & {
      as?: ComponentType;
      children: ReactNode;
    };

function Text<ComponentType extends ElementType>({
  variant,
  className,
  as,
  ...props
}: TextProps<ComponentType>) {
  const Component = as || "div";
  return (
    <Component
      {...props}
      className={cn(textVariants({ variant, className }), className)}
    />
  );
}

export { Text, textVariants };
