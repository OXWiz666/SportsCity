import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem, type Facility, type User, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';
import { Plus, Search, Edit2, Trash2, X, MapPin, Users as UsersIcon, DollarSign, Building2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Facilities', href: '/admin/facilities' },
];

interface Props {
    facilities: PaginatedData<Facility>;
    managers: User[];
    filters: { search?: string; status?: string };
}

const emptyFacility = {
    name: '',
    type: 'court' as Facility['type'],
    location: '',
    description: '',
    capacity: 0,
    hourly_rate: 0,
    image_url: '',
    status: 'active' as Facility['status'],
    managed_by: '' as number | '',
};

const fieldClass =
    'w-full rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white p-2.5 text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 transition-all';

export default function AdminFacilities({ facilities, managers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Facility | null>(null);
    const form = useForm(emptyFacility);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/facilities', { search }, { preserveState: true });
    };

    const openCreate = () => { form.reset(); setEditing(null); setShowModal(true); };
    const openEdit = (f: Facility) => {
        setEditing(f);
        form.setData({
            name: f.name,
            type: f.type,
            location: f.location,
            description: f.description || '',
            capacity: f.capacity,
            hourly_rate: f.hourly_rate,
            image_url: f.image_url || '',
            status: f.status,
            managed_by: f.managed_by ?? '',
        });
        setShowModal(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            form.put(`/admin/facilities/${editing.id}`, { onSuccess: () => setShowModal(false) });
        } else {
            form.post('/admin/facilities', { onSuccess: () => { setShowModal(false); form.reset(); } });
        }
    };

    const destroy = (id: number) => {
        if (confirm('Delete this facility?')) router.delete(`/admin/facilities/${id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facilities" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">Facilities</h1>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">Manage sports venues and availability</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 w-48 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 transition-all"
                            />
                        </form>
                        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black text-xs font-bold hover:bg-lime-300 transition-colors">
                            <Plus className="w-4 h-4" /> Add Facility
                        </button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {facilities.data.map((f, i) => (
                        <div
                            key={f.id}
                            className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden group hover:border-lime-300/50 dark:hover:border-lime-400/20 transition-all duration-500 hover:shadow-lg hover:shadow-lime-400/5 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${100 + i * 60}ms`, animationFillMode: 'forwards' }}
                        >
                            <div className="h-36 bg-neutral-100 dark:bg-zinc-800/50 relative overflow-hidden">
                                {f.image_url ? (
                                    <img src={f.image_url} alt={f.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-300 dark:text-zinc-700 text-xs font-medium">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute top-3 right-3"><StatusBadge status={f.status} /></div>
                                <div className="absolute bottom-3 left-3">
                                    <span className="inline-flex items-center rounded-lg px-2 py-0.5 bg-black/40 backdrop-blur-sm text-[10px] font-semibold text-white/90 capitalize">{f.type}</span>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <h3 className="font-bold text-neutral-800 dark:text-zinc-200 tracking-tight">{f.name}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-400 dark:text-zinc-500">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {f.location}</span>
                                    <span className="flex items-center gap-1"><UsersIcon className="w-3 h-3" /> {f.capacity}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ₱{f.hourly_rate}/hr</span>
                                </div>
                                <div className="flex gap-2 pt-3 border-t border-neutral-100 dark:border-zinc-800/30">
                                    <button onClick={() => openEdit(f)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 text-[11px] font-semibold hover:border-lime-300 dark:hover:border-lime-400/30 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all"><Edit2 className="w-3 h-3" /> Edit</button>
                                    <button onClick={() => destroy(f.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 text-[11px] font-semibold hover:border-red-300 dark:hover:border-red-400/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/5 transition-all"><Trash2 className="w-3 h-3" /> Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination paginator={facilities} />

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
                        <div
                            className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">{editing ? 'Edit Facility' : 'New Facility'}</h2>
                                    <p className="text-sm text-neutral-400 dark:text-zinc-500 mt-0.5">{editing ? 'Update venue details' : 'Add a new sports venue'}</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Name</label><input value={form.data.name} onChange={e => form.setData('name', e.target.value)} className={fieldClass} required /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Type</label><select value={form.data.type} onChange={e => form.setData('type', e.target.value as any)} className={fieldClass}>{['court','field','gym','pool','track'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Status</label><select value={form.data.status} onChange={e => form.setData('status', e.target.value as any)} className={fieldClass}>{['active','maintenance','closed'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                                </div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Location</label><input value={form.data.location} onChange={e => form.setData('location', e.target.value)} className={fieldClass} required /></div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Description</label><textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} className={`${fieldClass} h-20 resize-none`} /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Capacity</label><input type="number" value={form.data.capacity} onChange={e => form.setData('capacity', parseInt(e.target.value))} className={fieldClass} /></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Rate/hr (₱)</label><input type="number" step="0.01" value={form.data.hourly_rate} onChange={e => form.setData('hourly_rate', parseFloat(e.target.value))} className={fieldClass} /></div>
                                </div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Image URL</label><input value={form.data.image_url} onChange={e => form.setData('image_url', e.target.value)} className={fieldClass} /></div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Manager</label><select value={form.data.managed_by === '' ? '' : String(form.data.managed_by)} onChange={e => form.setData('managed_by', e.target.value ? parseInt(e.target.value, 10) : '')} className={fieldClass}><option value="">None</option>{managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
                                <button type="submit" disabled={form.processing} className="w-full py-3 rounded-xl bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors disabled:opacity-50">
                                    {editing ? 'Update Facility' : 'Create Facility'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
