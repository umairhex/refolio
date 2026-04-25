import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  ref?: React.Ref<HTMLDivElement>;
}

const Container = ({ children, className, as: Tag = "div", ref }: ContainerProps) => (
  <Tag ref={ref} className={cn("mx-auto max-w-400 px-6 md:px-12 lg:px-24", className)}>
    {children}
  </Tag>
);

Container.displayName = "Container";

export default Container;
