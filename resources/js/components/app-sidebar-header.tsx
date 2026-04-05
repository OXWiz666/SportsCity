import { Breadcrumbs } from '@/components/breadcrumbs';
import NotificationBell from '@/components/notifications/notification-bell';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { flash } = usePage<SharedData>().props;

    return (
        <>
            <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm px-4 md:px-6">
                <SidebarTrigger className="-ml-1 text-neutral-400 hover:text-lime-500 dark:text-zinc-500 dark:hover:text-lime-400 transition-colors" />
                <div className="h-4 w-px bg-neutral-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <NotificationBell />
            </header>
            {flash?.success && (
                <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg border border-lime-400/30 bg-lime-50 dark:bg-lime-400/5 backdrop-blur-sm px-4 py-3 text-sm font-bold text-lime-600 dark:text-lime-400">
                    <span className="w-2 h-2 rounded-full bg-lime-500 dark:bg-lime-400 animate-pulse flex-shrink-0" />
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg border border-red-400/30 bg-red-50 dark:bg-red-400/5 backdrop-blur-sm px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 flex-shrink-0" />
                    {flash.error}
                </div>
            )}
        </>
    );
}
