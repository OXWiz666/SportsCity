import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem, type Booking, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';
import { Search, Check, X as XIcon, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Bookings', href: '/admin/bookings' },
];

interface Props {
    bookings: PaginatedData<Booking>;
    filters: { search?: string; status?: string };
}

export default function AdminBookings({ bookings, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/bookings', { search, status: statusFilter }, { preserveState: true });
    };

    const updateStatus = (id: number, status: string) => {
        router.put(`/admin/bookings/${id}`, { status }, { preserveState: true });
    };

    const filterByStatus = (status: string) => {
        setStatusFilter(status);
        router.get('/admin/bookings', { search, status }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bookings Management" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                            <CalendarCheck className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">Booking Management</h1>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">Review and process booking requests</p>
                        </div>
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 w-56 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 transition-all" />
                        </div>
                    </form>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap opacity-0 animate-fade-in-up" style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}>
                    {['', 'pending', 'approved', 'rejected', 'cancelled'].map(s => (
                        <button key={s} onClick={() => filterByStatus(s)} className={`px-4 py-2 rounded-xl text-[11px] font-semibold border transition-all ${statusFilter === s ? 'border-lime-300 dark:border-lime-400/30 bg-lime-50 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400' : 'border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 hover:border-neutral-300 dark:hover:border-zinc-700 hover:text-neutral-600 dark:hover:text-zinc-400'}`}>
                            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '160ms', animationFillMode: 'forwards' }}>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-zinc-800/40">
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">User</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Facility</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Date</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Time</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Purpose</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Status</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 dark:divide-zinc-800/20">
                            {bookings.data.map((b, i) => (
                                <tr key={b.id} className="group/row hover:bg-lime-50/30 dark:hover:bg-lime-400/[0.02] transition-colors opacity-0 animate-fade-in-up" style={{ animationDelay: `${200 + i * 40}ms`, animationFillMode: 'forwards' }}>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 dark:text-zinc-400 group-hover/row:bg-lime-100 dark:group-hover/row:bg-lime-400/10 group-hover/row:text-lime-600 dark:group-hover/row:text-lime-400 transition-colors">
                                                {(b.user?.name || 'N')[0]}
                                            </div>
                                            <span className="text-sm font-medium text-neutral-700 dark:text-zinc-300">{b.user?.name || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-neutral-500 dark:text-zinc-500">{b.facility?.name || 'N/A'}</td>
                                    <td className="px-6 py-3.5 text-sm text-neutral-400 dark:text-zinc-600 font-mono tabular-nums">{b.booking_date}</td>
                                    <td className="px-6 py-3.5 text-sm text-neutral-400 dark:text-zinc-600 font-mono tabular-nums">{b.start_time} - {b.end_time}</td>
                                    <td className="px-6 py-3.5 text-sm text-neutral-500 dark:text-zinc-500">{b.purpose || '-'}</td>
                                    <td className="px-6 py-3.5"><StatusBadge status={b.status} /></td>
                                    <td className="px-6 py-3.5">
                                        {b.status === 'pending' && (
                                            <div className="flex gap-1.5">
                                                <button onClick={() => updateStatus(b.id, 'approved')} className="p-2 rounded-xl border border-lime-200 dark:border-lime-400/20 text-lime-600 dark:text-lime-400 hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all" title="Approve"><Check className="w-3.5 h-3.5" /></button>
                                                <button onClick={() => updateStatus(b.id, 'rejected')} className="p-2 rounded-xl border border-red-200 dark:border-red-400/20 text-red-500 dark:text-red-400 hover:bg-red-400 hover:text-white hover:border-red-400 transition-all" title="Reject"><XIcon className="w-3.5 h-3.5" /></button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {bookings.data.length === 0 && (
                                <tr><td colSpan={7} className="px-6 py-16 text-center text-sm text-neutral-400 dark:text-zinc-600">No bookings found</td></tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination paginator={bookings} />
                </div>
            </div>
        </AppLayout>
    );
}
