import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { type BreadcrumbItem, type User, type Role, type PaginatedData } from '@/types';
import Pagination from '@/components/admin/pagination';
import { Search, Shield, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Users', href: '/admin/users' },
];

interface Props {
    users: PaginatedData<User>;
    roles: Role[];
    filters: { search?: string };
}

const roleBadgeStyle: Record<string, string> = {
    'Admin': 'bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-400/25',
    'Facility Manager': 'bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/25',
};
const defaultRoleBadge = 'bg-lime-50 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border-lime-200 dark:border-lime-400/25';

export default function AdminUsers({ users, roles, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const roleForm = useForm({ roles: [] as number[] });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { search }, { preserveState: true });
    };

    const openRoleEditor = (user: User) => {
        setEditingUser(user);
        roleForm.setData('roles', user.roles?.map(r => r.id) || []);
    };

    const saveRoles = () => {
        if (!editingUser) return;
        roleForm.put(`/admin/users/${editingUser.id}/role`, { onSuccess: () => setEditingUser(null) });
    };

    const toggleRole = (roleId: number) => {
        const current = roleForm.data.roles;
        roleForm.setData('roles', current.includes(roleId) ? current.filter(r => r !== roleId) : [...current, roleId]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">User Management</h1>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">Manage accounts and role assignments</p>
                        </div>
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-zinc-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search users..."
                                className="pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-900/50 border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-900 dark:text-white text-sm focus:border-lime-400/50 focus:outline-none focus:ring-2 focus:ring-lime-400/10 w-64 placeholder:text-neutral-400 dark:placeholder:text-zinc-600 transition-all"
                            />
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-zinc-800/40">
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">User</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Email</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Roles</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Joined</th>
                                <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-50 dark:divide-zinc-800/20">
                            {users.data.map((user, i) => (
                                <tr key={user.id} className="group/row hover:bg-lime-50/30 dark:hover:bg-lime-400/[0.02] transition-colors opacity-0 animate-fade-in-up" style={{ animationDelay: `${150 + i * 40}ms`, animationFillMode: 'forwards' }}>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-[11px] font-bold text-neutral-500 dark:text-zinc-400 group-hover/row:bg-lime-100 dark:group-hover/row:bg-lime-400/10 group-hover/row:text-lime-600 dark:group-hover/row:text-lime-400 transition-colors">
                                                {(user.first_name || user.name || 'U')[0]}
                                            </div>
                                            <span className="text-sm font-medium text-neutral-700 dark:text-zinc-300">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-neutral-400 dark:text-zinc-500 font-mono">{user.email}</td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex gap-1.5 flex-wrap">
                                            {user.roles?.length ? user.roles.map(r => (
                                                <span key={r.id} className={`inline-flex items-center rounded-full px-2 py-0.5 border text-[10px] font-semibold ${roleBadgeStyle[r.name] || defaultRoleBadge}`}>
                                                    {r.name}
                                                </span>
                                            )) : <span className="text-[11px] text-neutral-300 dark:text-zinc-700">No roles</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-[11px] text-neutral-400 dark:text-zinc-600 font-mono tabular-nums">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-3.5">
                                        <button onClick={() => openRoleEditor(user)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/60 dark:border-zinc-800/50 text-neutral-400 dark:text-zinc-500 text-[11px] font-semibold hover:border-lime-300 dark:hover:border-lime-400/30 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all">
                                            <Shield className="w-3.5 h-3.5" /> Roles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination paginator={users} />
                </div>

                {/* Modal */}
                {editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setEditingUser(null)}>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 p-6 w-full max-w-md shadow-2xl shadow-black/10 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white mb-1">Edit Roles</h2>
                            <p className="text-sm text-neutral-400 dark:text-zinc-500 mb-5">{editingUser.name}</p>
                            <div className="space-y-2 mb-6">
                                {roles.map((role) => (
                                    <label key={role.id} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${roleForm.data.roles.includes(role.id) ? 'border-lime-300 dark:border-lime-400/40 bg-lime-50/50 dark:bg-lime-400/5' : 'border-neutral-200/60 dark:border-zinc-800/50 hover:border-neutral-300 dark:hover:border-zinc-700'}`} onClick={() => toggleRole(role.id)}>
                                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${roleForm.data.roles.includes(role.id) ? 'border-lime-400 bg-lime-400' : 'border-neutral-300 dark:border-zinc-600'}`}>
                                            {roleForm.data.roles.includes(role.id) && <span className="text-black text-xs font-black">✓</span>}
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-neutral-800 dark:text-zinc-200 block">{role.name}</span>
                                            <span className="text-[11px] text-neutral-400 dark:text-zinc-500">{role.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={saveRoles} disabled={roleForm.processing} className="flex-1 py-2.5 rounded-xl bg-lime-400 text-black text-sm font-bold hover:bg-lime-300 transition-colors disabled:opacity-50">
                                    Save Changes
                                </button>
                                <button onClick={() => setEditingUser(null)} className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-800 text-neutral-500 dark:text-zinc-400 text-sm font-medium hover:border-lime-300 dark:hover:border-lime-400/30 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
