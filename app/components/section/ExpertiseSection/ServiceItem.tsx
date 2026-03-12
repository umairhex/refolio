"use client";

import { Service } from "@/types";

interface ServiceItemProps {
  service: Service;
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="service-item group border-foreground/5 hover:border-foreground flex flex-col gap-8 border p-8 transition-colors duration-500">
      <span className="text-[12px] font-bold opacity-30">{service.id}</span>
      <h3 className="text-2xl font-medium tracking-tight uppercase">{service.title}</h3>
      <p className="max-w-[280px] text-sm leading-relaxed opacity-60">
        {service.description}
      </p>
      <div className="mt-auto flex items-center gap-4 overflow-hidden pt-8">
        <div className="bg-foreground/20 h-px w-8 transition-all duration-700 group-hover:w-full" />
      </div>
    </div>
  );
};
