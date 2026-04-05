import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem, type Booking, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'My Bookings', href: '/bookings' }];

interface Props { bookings: PaginatedData<Booking> }

export default function MyBookings({ bookings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Bookings" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">My Bookings</h1>
                <div className="rounded-xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-black">
                                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">Facility</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">Date</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">Time</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">Purpose</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-zinc-900">
                            {bookings.data.map(b => (
                                <tr key={b.id} className="hover:bg-neutral-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-bold text-neutral-900 dark:text-white">{b.facility?.name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-neutral-500 dark:text-zinc-400 font-mono">{b.booking_date}</td>
                                    <td className="px-4 py-3 text-sm text-neutral-500 dark:text-zinc-400 font-mono">{b.start_time} - {b.end_time}</td>
                                    <td className="px-4 py-3 text-sm text-neutral-500 dark:text-zinc-400">{b.purpose || '-'}</td>
                                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                                </tr>
                            ))}
                            {bookings.data.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-xs text-neutral-400 dark:text-zinc-600 font-bold uppercase tracking-widest">No bookings yet</td></tr>}
                        </tbody>
                    </table>
                    <Pagination paginator={bookings} />
                </div>
            </div>
        </AppLayout>
    );
}
