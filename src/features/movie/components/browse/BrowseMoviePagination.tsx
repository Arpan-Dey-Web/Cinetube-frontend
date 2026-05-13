"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type ServerProps = {
  mode: "server";
  pathname: string;
  totalPages: number;
  effectivePage: number;
  buildQuery: (pageNum: number) => string;
};

type ClientProps = {
  mode: "client";
  totalPages: number;
  page: number;
  setPage: (p: number) => void;
};

type Props = ServerProps | ClientProps;

export function BrowseMoviePagination(props: Props) {
  if (props.mode === "server") {
    const { pathname, totalPages, effectivePage, buildQuery } = props;
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {effectivePage <= 1 ? (
              <span className="inline-flex">
                <PaginationPrevious
                  href="#"
                  className="pointer-events-none opacity-40"
                  onClick={(e) => e.preventDefault()}
                />
              </span>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="default"
                className="pl-1.5!"
              >
                <Link
                  href={`${pathname}?${buildQuery(effectivePage - 1)}`}
                  scroll={false}
                  aria-label="Go to previous page"
                >
                  <span className="flex items-center gap-1">
                    <ChevronLeft className="size-4" aria-hidden />
                    <span className="hidden sm:inline">Previous</span>
                  </span>
                </Link>
              </Button>
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            if (
              p === 1 ||
              p === totalPages ||
              Math.abs(p - effectivePage) <= 1
            ) {
              const active = p === effectivePage;
              return (
                <PaginationItem key={p}>
                  <Button
                    asChild
                    variant={active ? "outline" : "ghost"}
                    size="icon"
                  >
                    <Link
                      href={`${pathname}?${buildQuery(p)}`}
                      scroll={false}
                      aria-current={active ? "page" : undefined}
                      data-active={active}
                    >
                      {p}
                    </Link>
                  </Button>
                </PaginationItem>
              );
            }
            if (Math.abs(p - effectivePage) === 2) {
              return (
                <PaginationItem key={`ellipsis-${p}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          <PaginationItem>
            {effectivePage >= totalPages ? (
              <span className="inline-flex">
                <PaginationNext
                  href="#"
                  className="pointer-events-none opacity-40"
                  onClick={(e) => e.preventDefault()}
                />
              </span>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="default"
                className="pr-1.5!"
              >
                <Link
                  href={`${pathname}?${buildQuery(effectivePage + 1)}`}
                  scroll={false}
                  aria-label="Go to next page"
                >
                  <span className="flex items-center gap-1">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </Button>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  const { totalPages, page, setPage } = props;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
            className={page === 1 ? "pointer-events-none opacity-40" : ""}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (Math.abs(p - page) === 2) {
            return (
              <PaginationItem key={`ellipsis-${p}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) setPage(page + 1);
            }}
            className={
              page === totalPages ? "pointer-events-none opacity-40" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
