import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem, type Announcement, type PaginatedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import Pagination from '@/components/admin/pagination';
import { Plus, Trash2, Megaphone, X, Clock } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Announcements', href: '/admin/announcements' },
];

interface Props { announcements: PaginatedData<Announcement> }

const inputClass =
    'w-full rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white p-2.5 text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 transition-all placeholder:text-neutral-400 dark:placeholder:text-zinc-600';

export default function AdminAnnouncements({ announcements }: Props) {
    const [showModal, setShowModal] = useState(false);
    const form = useForm({ title: '', body: '', priority: 'normal' as string, published_at: '', expires_at: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/admin/announcements', { onSuccess: () => { setShowModal(false); form.reset(); } });
    };

    const destroy = (id: number) => { if (confirm('Delete this announcement?')) router.delete(`/admin/announcements/${id}`); };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Announcements" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">Announcements</h1>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">Broadcast news and updates</p>
                        </div>
                    </div>
                    <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 text-black text-xs font-bold hover:bg-lime-300 transition-colors"><Plus className="w-4 h-4" /> New Post</button>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    {announcements.data.map((a, i) => (
                        <div key={a.id} className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 p-5 hover:border-lime-300/50 dark:hover:border-lime-400/20 transition-all duration-300 group opacity-0 animate-fade-in-up" style={{ animationDelay: `${80 + i * 60}ms`, animationFillMode: 'forwards' }}>
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Megaphone className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-neutral-800 dark:text-zinc-200 tracking-tight text-base">{a.title}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400 dark:text-zinc-600">
                                            <span>{a.author?.name || 'System'}</span>
                                            <span className="w-1 h-1 rounded-full bg-neutral-200 dark:bg-zinc-700" />
                                            <span className="font-mono">{a.published_at ? new Date(a.published_at).toLocaleDateString() : 'Draft'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <StatusBadge status={a.priority} />
                                    <button onClick={() => destroy(a.id)} className="w-8 h-8 rounded-xl flex items-center justify-center border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 hover:border-red-300 dark:hover:border-red-400/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/5 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-zinc-500 leading-relaxed pl-[52px]">{a.body}</p>
                            {a.expires_at && (
                                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-zinc-600 font-mono mt-3 pl-[52px]">
                                    <Clock className="w-3 h-3" /> Expires: {new Date(a.expires_at).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    ))}
                    {announcements.data.length === 0 && (
                        <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 border-dashed py-16 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '80ms', animationFillMode: 'forwards' }}>
                            <Megaphone className="w-8 h-8 text-neutral-200 dark:text-zinc-700 mx-auto mb-3" />
                            <p className="text-sm text-neutral-400 dark:text-zinc-600">No announcements yet</p>
                        </div>
                    )}
                </div>
                <Pagination paginator={announcements} />

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 p-6 w-full max-w-lg shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">New Announcement</h2>
                                    <p className="text-sm text-neutral-400 dark:text-zinc-500 mt-0.5">Post a message to all users</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-neutral-400 dark:text-zinc-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={submit} className="space-y-4">
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Title</label><input value={form.data.title} onChange={e => form.setData('title', e.target.value)} className={inputClass} required /></div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Body</label><textarea value={form.data.body} onChange={e => form.setData('body', e.target.value)} className={`${inputClass} h-32 resize-none`} required /></div>
                                <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Priority</label><select value={form.data.priority} onChange={e => form.setData('priority', e.target.value)} className={inputClass}>{['low','normal','high','urgent'].map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Publish At</label><input type="datetime-local" value={form.data.published_at} onChange={e => form.setData('published_at', e.target.value)} className={`${inputClass} dark:[&::-webkit-calendar-picker-indicator]:invert`} /></div>
                                    <div><label className="text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 block mb-1.5">Expires At</label><input type="datetime-local" value={form.data.expires_at} onChange={e => form.setData('expires_at', e.target.value)} className={`${inputClass} dark:[&::-webkit-calendar-picker-indicator]:invert`} /></div>
                                </div>
                                <button type="submit" disabled={form.processing} className="w-full py-3 rounded-xl bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors disabled:opacity-50">Publish Announcement</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
