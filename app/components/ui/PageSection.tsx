import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  ({ children, className, id, as: Tag = "section" }, ref) => (
    <Tag ref={ref} id={id} className={cn("px-6 md:px-12 lg:px-24", className)}>
      {children}
    </Tag>
  ),
);

PageSection.displayName = "PageSection";

export default PageSection;
