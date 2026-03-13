"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cq-surface mb-6">
        <Icon className="w-8 h-8 text-cq-text-secondary/50" />
      </div>
      <h3 className="cq-heading text-lg text-cq-text mb-2">{title}</h3>
      <p className="text-sm text-cq-text-secondary text-center max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-5 py-2.5 text-sm font-medium text-white bg-cq-primary rounded-[var(--cq-radius-md)] hover:bg-cq-primary-light transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
