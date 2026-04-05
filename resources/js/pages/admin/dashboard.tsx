import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type Booking, type SharedData } from '@/types';
import { Users, Building2, CalendarCheck, Trophy, Clock, Activity, ArrowUpRight, Zap } from 'lucide-react';
import StatCard from '@/components/admin/stat-card';
import ChartCard from '@/components/admin/chart-card';
import StatusBadge from '@/components/admin/status-badge';
import { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin Dashboard', href: '/admin/dashboard' }];

const COLORS = ['#a3e635', '#22d3ee', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'];

interface Props {
    stats: {
        totalUsers: number;
        totalFacilities: number;
        totalBookings: number;
        activeLeagues: number;
        pendingBookings: number;
        activeFacilities: number;
    };
    bookingsOverTime: { date: string; count: number }[];
    facilityUtilization: { name: string; bookings: number }[];
    leaguesBySport: { sport_type: string; count: number }[];
    userRegistrations: { date: string; count: number }[];
    recentBookings: Booking[];
}

const tooltipStyle = {
    contentStyle: { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: 12, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
    labelStyle: { color: '#a1a1aa', fontWeight: 700, fontSize: 10, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
    itemStyle: { color: '#a3e635', fontWeight: 600, fontSize: 12 },
};

function TimeGreeting({ name }: { name: string }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(t);
    }, []);

    const hour = time.getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <p className="text-[11px] font-medium text-neutral-400 dark:text-zinc-500 mb-1">{greeting},</p>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                {name} <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%]">👋</span>
            </h1>
        </div>
    );
}

export default function AdminDashboard({ stats, bookingsOverTime, facilityUtilization, leaguesBySport, userRegistrations, recentBookings }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <TimeGreeting name={auth.user.first_name} />
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
                        </span>
                        <span className="text-[11px] font-semibold text-lime-700 dark:text-lime-400">All systems operational</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <StatCard title="Users" value={stats.totalUsers} icon={Users} delay={0} />
                    <StatCard title="Facilities" value={stats.totalFacilities} icon={Building2} delay={80} />
                    <StatCard title="Bookings" value={stats.totalBookings} icon={CalendarCheck} delay={160} />
                    <StatCard title="Leagues" value={stats.activeLeagues} icon={Trophy} delay={240} />
                    <StatCard title="Pending" value={stats.pendingBookings} icon={Clock} delay={320} />
                    <StatCard title="Active" value={stats.activeFacilities} icon={Activity} delay={400} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ChartCard title="Booking Trends" description="Last 30 days" className="lg:col-span-2">
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={bookingsOverTime}>
                                <defs>
                                    <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a3e635" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="#a3e635" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
                                <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                                <Tooltip {...tooltipStyle} />
                                <Area type="monotone" dataKey="count" stroke="#a3e635" strokeWidth={2} fill="url(#bookingGrad)" dot={false} activeDot={{ r: 4, fill: '#a3e635', strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="Sports" description="League distribution">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={leaguesBySport}
                                    dataKey="count"
                                    nameKey="sport_type"
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    stroke="none"
                                >
                                    {leaguesBySport.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip {...tooltipStyle} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={32}
                                    iconType="circle"
                                    iconSize={6}
                                    formatter={(value: string) => <span className="text-[10px] text-neutral-500 dark:text-zinc-500 font-medium ml-0.5">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ChartCard title="Facility Usage" description="Bookings per venue">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={facilityUtilization} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
                                <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 9 }} angle={-15} textAnchor="end" height={50} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                                <Tooltip {...tooltipStyle} />
                                <Bar dataKey="bookings" radius={[8, 8, 0, 0]}>
                                    {facilityUtilization.map((_, i) => (
                                        <Cell key={i} fill={`rgba(163, 230, 53, ${1 - i * 0.12})`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    <ChartCard title="New Users" description="Registration trend">
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={userRegistrations}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.3} />
                                <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                                <Tooltip {...tooltipStyle} />
                                <Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Recent Bookings */}
                <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">Recent Activity</h3>
                                <p className="text-[10px] text-neutral-400 dark:text-zinc-600">Latest booking requests</p>
                            </div>
                        </div>
                        <a href="/admin/bookings" className="group/link flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-neutral-500 dark:text-zinc-500 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-400/5 transition-all">
                            View All <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-t border-neutral-100 dark:border-zinc-800/40">
                                    <th className="px-6 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">User</th>
                                    <th className="px-6 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Facility</th>
                                    <th className="px-6 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Date</th>
                                    <th className="px-6 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-50 dark:divide-zinc-800/20">
                                {recentBookings.map((b, i) => (
                                    <tr
                                        key={b.id}
                                        className="group/row hover:bg-lime-50/50 dark:hover:bg-lime-400/[0.02] transition-colors opacity-0 animate-fade-in-up"
                                        style={{ animationDelay: `${600 + i * 60}ms`, animationFillMode: 'forwards' }}
                                    >
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-neutral-500 dark:text-zinc-400 group-hover/row:bg-lime-100 dark:group-hover/row:bg-lime-400/10 group-hover/row:text-lime-600 dark:group-hover/row:text-lime-400 transition-colors">
                                                    {(b.user?.name || 'N')[0]}
                                                </div>
                                                <span className="text-sm font-medium text-neutral-700 dark:text-zinc-300">{b.user?.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-neutral-500 dark:text-zinc-500">{b.facility?.name || 'N/A'}</td>
                                        <td className="px-6 py-3 text-sm text-neutral-400 dark:text-zinc-600 font-mono tabular-nums">{b.booking_date}</td>
                                        <td className="px-6 py-3"><StatusBadge status={b.status} /></td>
                                    </tr>
                                ))}
                                {recentBookings.length === 0 && (
                                    <tr><td colSpan={4} className="px-6 py-16 text-center text-sm text-neutral-400 dark:text-zinc-600">No bookings yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
