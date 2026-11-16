import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

interface TableCardProps {
  title: string;
  description?: string;
  columns: string[];
  /** Lignes déjà rendues (<TableRow>). Vide → état vide affiché. */
  children?: React.ReactNode;
  isEmpty: boolean;
  empty: {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
  };
  toolbar?: React.ReactNode;
  headerAction?: React.ReactNode;
  className?: string;
}

export function TableCard({
  title,
  description,
  columns,
  children,
  isEmpty,
  empty,
  toolbar,
  headerAction,
  className,
}: TableCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-col gap-3 space-y-0 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
        </div>
        {headerAction}
      </CardHeader>
      {toolbar && <div className="border-t px-5 py-3">{toolbar}</div>}
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c}>{c}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  <EmptyState
                    variant="bare"
                    icon={empty.icon}
                    title={empty.title}
                    description={empty.description}
                  >
                    {empty.action}
                  </EmptyState>
                </TableCell>
              </TableRow>
            ) : (
              children
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
