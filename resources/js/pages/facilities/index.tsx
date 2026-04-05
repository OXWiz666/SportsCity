import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem, type Facility, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';
import { Search, MapPin, Users, Clock, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Facilities', href: '/facilities' }];

interface Props { facilities: PaginatedData<Facility>; filters: { search?: string; type?: string } }

export default function Facilities({ facilities, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [bookingFacility, setBookingFacility] = useState<Facility | null>(null);
    const bookingForm = useForm({ facility_id: 0, booking_date: '', start_time: '', end_time: '', purpose: '', notes: '' });

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); router.get('/facilities', { search }, { preserveState: true }); };

    const openBooking = (f: Facility) => { setBookingFacility(f); bookingForm.setData('facility_id', f.id); };

    const submitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        bookingForm.post('/bookings', { onSuccess: () => { setBookingFacility(null); bookingForm.reset(); } });
    };

    const inputClass = 'w-full rounded-lg bg-white dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 text-neutral-900 dark:text-white p-2.5 text-sm font-bold focus:border-lime-400 focus:outline-none dark:[&::-webkit-calendar-picker-indicator]:invert transition-colors';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facilities" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Browse Facilities</h1>
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search facilities..." className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 text-neutral-900 dark:text-white text-sm font-bold focus:border-lime-400 focus:outline-none w-64 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 transition-colors" />
                    </form>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {['', 'court', 'field', 'gym', 'pool', 'track'].map(t => (
                        <button key={t} onClick={() => router.get('/facilities', { search, type: t }, { preserveState: true })} className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${filters.type === t ? 'border-lime-400 bg-lime-50 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400' : 'border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-500 hover:border-neutral-300 dark:hover:border-zinc-700'}`}>
                            {t || 'All'}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {facilities.data.map(f => (
                        <div key={f.id} className="rounded-xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden group hover:border-lime-400/50 transition-colors">
                            <div className="h-40 bg-neutral-100 dark:bg-zinc-900 relative overflow-hidden">
                                {f.image_url ? <img src={f.image_url} alt={f.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /> : <div className="flex items-center justify-center h-full text-neutral-300 dark:text-zinc-700 text-xs font-bold uppercase tracking-widest">No Image</div>}
                                <div className="absolute top-2 left-2"><StatusBadge status={f.type} /></div>
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="font-black text-neutral-900 dark:text-white uppercase tracking-tight text-lg">{f.name}</h3>
                                <div className="flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-zinc-500 font-bold">
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {f.location}</span>
                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {f.capacity}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ₱{f.hourly_rate}/hr</span>
                                </div>
                                {f.description && <p className="text-xs text-neutral-500 dark:text-zinc-400 line-clamp-2">{f.description}</p>}
                                <button onClick={() => openBooking(f)} className="w-full mt-2 py-2 rounded-lg bg-lime-400 text-black text-xs font-black uppercase tracking-widest hover:bg-lime-300 transition-colors">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination paginator={facilities} />

                {bookingFacility && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm" onClick={() => setBookingFacility(null)}>
                        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-neutral-200 dark:border-zinc-800 p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Book {bookingFacility.name}</h2>
                                <button onClick={() => setBookingFacility(null)} className="text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={submitBooking} className="space-y-4">
                                <div><label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 dark:text-zinc-500 block mb-1">Date</label><input type="date" value={bookingForm.data.booking_date} onChange={e => bookingForm.setData('booking_date', e.target.value)} className={inputClass} required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 dark:text-zinc-500 block mb-1">Start</label><input type="time" value={bookingForm.data.start_time} onChange={e => bookingForm.setData('start_time', e.target.value)} className={inputClass} required /></div>
                                    <div><label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 dark:text-zinc-500 block mb-1">End</label><input type="time" value={bookingForm.data.end_time} onChange={e => bookingForm.setData('end_time', e.target.value)} className={inputClass} required /></div>
                                </div>
                                <div><label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 dark:text-zinc-500 block mb-1">Purpose</label><input value={bookingForm.data.purpose} onChange={e => bookingForm.setData('purpose', e.target.value)} className={inputClass} placeholder="e.g. Basketball practice" /></div>
                                {bookingForm.errors.start_time && <p className="text-xs text-red-500 dark:text-red-400 font-bold">{bookingForm.errors.start_time}</p>}
                                <button type="submit" disabled={bookingForm.processing} className="w-full py-3 rounded-lg bg-lime-400 text-black text-xs font-black uppercase tracking-widest hover:bg-lime-300 transition-colors disabled:opacity-50">Submit Booking</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
