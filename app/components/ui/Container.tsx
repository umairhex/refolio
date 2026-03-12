import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, as: Tag = "div" }, ref) => (
    <Tag ref={ref} className={cn("mx-auto max-w-[1600px]", className)}>
      {children}
    </Tag>
  ),
);

Container.displayName = "Container";

export default Container;
