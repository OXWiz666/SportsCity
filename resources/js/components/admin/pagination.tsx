import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type PaginatedData } from '@/types';

interface PaginationProps {
    paginator: PaginatedData<unknown>;
}

export default function Pagination({ paginator }: PaginationProps) {
    if (paginator.last_page <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-neutral-200 dark:border-zinc-800/60 px-5 py-3">
            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">
                <span className="font-bold text-neutral-600 dark:text-zinc-300">{paginator.from}-{paginator.to}</span> of <span className="font-bold text-neutral-600 dark:text-zinc-300">{paginator.total}</span> results
            </p>
            <div className="flex items-center gap-1.5">
                {paginator.prev_page_url ? (
                    <Link href={paginator.prev_page_url} className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 hover:border-lime-400/50 hover:text-lime-500 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all">
                        <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </Link>
                ) : (
                    <span className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-neutral-100 dark:border-zinc-800/50 text-neutral-300 dark:text-zinc-700">
                        <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </span>
                )}
                <span className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/30 text-lime-600 dark:text-lime-400 tabular-nums">
                    {paginator.current_page} / {paginator.last_page}
                </span>
                {paginator.next_page_url ? (
                    <Link href={paginator.next_page_url} className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 hover:border-lime-400/50 hover:text-lime-500 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all">
                        Next <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                ) : (
                    <span className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold rounded-lg border border-neutral-100 dark:border-zinc-800/50 text-neutral-300 dark:text-zinc-700">
                        Next <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                )}
            </div>
        </div>
    );
}
