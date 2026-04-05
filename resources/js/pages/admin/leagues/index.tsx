import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem, type League, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';
import { Plus, Search, Edit2, Trophy, Users, Gamepad2, X, Calendar } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Leagues', href: '/admin/leagues' },
];

interface Props {
    leagues: PaginatedData<League>;
    filters: { search?: string; status?: string };
}

const emptyLeague = { name: '', sport_type: '', description: '', season: '', status: 'upcoming' as const, max_teams: 16, start_date: '', end_date: '' };

const inputClass =
    'w-full rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white p-2.5 text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-neutral-400 dark:placeholder:text-zinc-600';

export default function AdminLeagues({ leagues, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<League | null>(null);
    const form = useForm(emptyLeague);

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); router.get('/admin/leagues', { search }, { preserveState: true }); };
    const openCreate = () => { form.reset(); setEditing(null); setShowModal(true); };
    const openEdit = (l: League) => {
        setEditing(l);
        form.setData({ name: l.name, sport_type: l.sport_type, description: l.description || '', season: l.season || '', status: l.status, max_teams: l.max_teams, start_date: l.start_date || '', end_date: l.end_date || '' });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/leagues/${editing.id}`, { onSuccess: () => setShowModal(false) });
        } else {
            form.post('/admin/leagues', { onSuccess: () => { setShowModal(false); form.reset(); } });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="League Management" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">Leagues</h1>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">Manage sports leagues and tournaments</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 w-48 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 transition-all" />
                        </form>
                        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black text-xs font-bold hover:bg-lime-300 transition-colors"><Plus className="w-4 h-4" /> New League</button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {leagues.data.map((l, i) => (
                        <div key={l.id} className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 p-5 group hover:border-lime-300/50 dark:hover:border-lime-400/20 transition-all duration-500 hover:shadow-lg hover:shadow-lime-400/5 opacity-0 animate-fade-in-up" style={{ animationDelay: `${100 + i * 60}ms`, animationFillMode: 'forwards' }}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Trophy className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-800 dark:text-zinc-200 tracking-tight">{l.name}</h3>
                                        <p className="text-[11px] text-lime-600 dark:text-lime-400 font-semibold">{l.sport_type}</p>
                                    </div>
                                </div>
                                <StatusBadge status={l.status} />
                            </div>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-600 mb-3">{l.season || 'No season set'}</p>
                            {l.description && <p className="text-xs text-neutral-500 dark:text-zinc-500 mb-3 line-clamp-2 leading-relaxed">{l.description}</p>}
                            <div className="flex gap-4 text-[11px] text-neutral-400 dark:text-zinc-500 mb-4">
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {l.teams_count || 0}/{l.max_teams}</span>
                                <span className="flex items-center gap-1"><Gamepad2 className="w-3.5 h-3.5" /> {l.games_count || 0} games</span>
                            </div>
                            {(l.start_date || l.end_date) && (
                                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-zinc-600 font-mono mb-4">
                                    <Calendar className="w-3 h-3" /> {l.start_date} → {l.end_date}
                                </div>
                            )}
                            <div className="pt-3 border-t border-neutral-100 dark:border-zinc-800/30">
                                <button onClick={() => openEdit(l)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 text-[11px] font-semibold hover:border-lime-300 dark:hover:border-lime-400/30 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all"><Edit2 className="w-3 h-3" /> Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination paginator={leagues} />

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">{editing ? 'Edit League' : 'New League'}</h2>
                                    <p className="text-sm text-neutral-400 dark:text-zinc-500 mt-0.5">{editing ? 'Update league details' : 'Create a new league'}</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Name</label><input value={form.data.name} onChange={e => form.setData('name', e.target.value)} className={inputClass} required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Sport</label><input value={form.data.sport_type} onChange={e => form.setData('sport_type', e.target.value)} className={inputClass} required /></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Season</label><input value={form.data.season} onChange={e => form.setData('season', e.target.value)} className={inputClass} /></div>
                                </div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Description</label><textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} className={`${inputClass} h-20 resize-none`} /></div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Status</label><select value={form.data.status} onChange={e => form.setData('status', e.target.value as any)} className={inputClass}>{['upcoming','active','completed'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Max Teams</label><input type="number" value={form.data.max_teams} onChange={e => form.setData('max_teams', parseInt(e.target.value))} className={inputClass} /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Start Date</label><input type="date" value={form.data.start_date} onChange={e => form.setData('start_date', e.target.value)} className={`${inputClass} dark:[&::-webkit-calendar-picker-indicator]:invert`} /></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">End Date</label><input type="date" value={form.data.end_date} onChange={e => form.setData('end_date', e.target.value)} className={`${inputClass} dark:[&::-webkit-calendar-picker-indicator]:invert`} /></div>
                                </div>
                                <button type="submit" disabled={form.processing} className="w-full py-3 rounded-xl bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors disabled:opacity-50">{editing ? 'Update' : 'Create'} League</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
