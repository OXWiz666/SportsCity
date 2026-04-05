import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem, type AppNotification, type PaginatedData } from '@/types';
import { Bell, CheckCheck, CalendarCheck, Megaphone, Trophy } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Notifications', href: '/notifications' }];

interface Props { notifications: PaginatedData<AppNotification> }

const typeIcons: Record<string, React.ElementType> = {
    booking_approved: CalendarCheck, booking_rejected: CalendarCheck,
    new_announcement: Megaphone, game_schedule_changed: Trophy,
};

export default function Notifications({ notifications }: Props) {
    const markAllRead = () => router.post('/notifications/read-all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Notifications</h1>
                    <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-zinc-700 text-neutral-500 dark:text-zinc-400 text-xs font-black uppercase tracking-widest hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
                        <CheckCheck className="w-4 h-4" /> Mark All Read
                    </button>
                </div>
                <div className="rounded-xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden divide-y divide-neutral-100 dark:divide-zinc-900">
                    {notifications.data.map(n => {
                        const Icon = typeIcons[n.data.type] || Bell;
                        return (
                            <div key={n.id} className={`p-4 flex items-start gap-4 transition-colors hover:bg-neutral-50 dark:hover:bg-zinc-900/50 ${!n.read_at ? 'bg-lime-50/50 dark:bg-lime-400/[0.03] border-l-2 border-l-lime-500 dark:border-l-lime-400' : ''}`}>
                                <div className={`p-2 rounded-lg border ${!n.read_at ? 'border-lime-300 dark:border-lime-400/50 bg-lime-100 dark:bg-lime-400/10' : 'border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-black'}`}>
                                    <Icon className={`w-4 h-4 ${!n.read_at ? 'text-lime-600 dark:text-lime-400' : 'text-neutral-400 dark:text-zinc-600'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-bold ${!n.read_at ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-zinc-400'}`}>{n.data.message}</p>
                                    <p className="text-[10px] text-neutral-400 dark:text-zinc-600 font-mono mt-1">{new Date(n.created_at).toLocaleString()}</p>
                                </div>
                                {!n.read_at && <span className="w-2 h-2 bg-lime-500 dark:bg-lime-400 rounded-full flex-shrink-0 mt-2 animate-pulse" />}
                            </div>
                        );
                    })}
                    {notifications.data.length === 0 && <p className="p-12 text-center text-xs text-neutral-400 dark:text-zinc-600 font-bold uppercase tracking-widest">No notifications</p>}
                </div>
            </div>
        </AppLayout>
    );
}
