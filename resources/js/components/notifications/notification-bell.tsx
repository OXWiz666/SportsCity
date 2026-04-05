import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';

export default function NotificationBell() {
    const { unreadNotificationCount } = usePage<SharedData>().props;

    return (
        <Link
            href="/notifications"
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-neutral-400 dark:text-zinc-500 hover:text-lime-500 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 border border-transparent hover:border-lime-300 dark:hover:border-lime-400/20 transition-all duration-200"
            title="Notifications"
        >
            <Bell className="w-[18px] h-[18px]" />
            {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 bg-lime-400 text-black text-[10px] font-black rounded-full shadow-lg shadow-lime-400/25">
                    {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                </span>
            )}
        </Link>
    );
}
