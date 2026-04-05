import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type Booking, type Game, type Announcement, type SharedData } from '@/types';
import StatusBadge from '@/components/admin/status-badge';
import { CalendarCheck, Trophy, Megaphone, Activity, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useCountUp } from '@/hooks/use-count-up';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface Props {
    myBookings: Booking[];
    upcomingGames: Game[];
    announcements: Announcement[];
    stats: { totalBookings: number; approvedBookings: number; activeLeagues: number };
}

function MiniStat({ label, value, icon: Icon, delay }: { label: string; value: number; icon: React.ElementType; delay: number }) {
    const { count, ref } = useCountUp(value, 1200);
    return (
        <div
            ref={ref}
            className="group relative flex items-center gap-4 rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 p-5 transition-all duration-500 hover:border-lime-300 dark:hover:border-lime-400/30 hover:shadow-lg hover:shadow-lime-400/5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
        >
            <div className="w-11 h-11 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400 group-hover:scale-110">
                <Icon className="w-5 h-5 text-lime-600 dark:text-lime-400 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
            </div>
            <div>
                <p className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums">{count.toLocaleString()}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">{label}</p>
            </div>
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lime-400/0 to-transparent group-hover:via-lime-400/40 transition-all duration-700" />
        </div>
    );
}

function SectionHeader({ icon: Icon, title, count, href }: { icon: React.ElementType; title: string; count: number; href?: string }) {
    return (
        <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h3>
                {count > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-[10px] font-bold text-neutral-500 dark:text-zinc-400 tabular-nums">{count}</span>
                )}
            </div>
            {href && (
                <a href={href} className="group/link flex items-center gap-1 text-[11px] font-semibold text-neutral-400 dark:text-zinc-500 hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
                    See all <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </a>
            )}
        </div>
    );
}

export default function Dashboard({ myBookings, upcomingGames, announcements, stats }: Props) {
    const { auth } = usePage<SharedData>().props;

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
                {/* Greeting */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <p className="text-[11px] font-medium text-neutral-400 dark:text-zinc-500 mb-1">{greeting},</p>
                    <h1 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">{auth.user.first_name}</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <MiniStat label="My Bookings" value={stats.totalBookings} icon={CalendarCheck} delay={100} />
                    <MiniStat label="Approved" value={stats.approvedBookings} icon={Activity} delay={200} />
                    <MiniStat label="Active Leagues" value={stats.activeLeagues} icon={Trophy} delay={300} />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Recent Bookings */}
                    <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                        <SectionHeader icon={CalendarCheck} title="Recent Bookings" count={myBookings.length} href="/bookings" />
                        <div className="divide-y divide-neutral-50 dark:divide-zinc-800/30">
                            {myBookings.map((b, i) => (
                                <div key={b.id} className="group/item px-5 py-3.5 flex items-center justify-between hover:bg-lime-50/30 dark:hover:bg-lime-400/[0.02] transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center transition-colors group-hover/item:bg-lime-100 dark:group-hover/item:bg-lime-400/10">
                                            <MapPin className="w-4 h-4 text-neutral-400 dark:text-zinc-500 group-hover/item:text-lime-600 dark:group-hover/item:text-lime-400 transition-colors" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-neutral-800 dark:text-zinc-200 truncate">{b.facility?.name || 'Facility'}</p>
                                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-zinc-600 font-mono">
                                                <Clock className="w-3 h-3" />
                                                <span>{b.booking_date} • {b.start_time}-{b.end_time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </div>
                            ))}
                            {myBookings.length === 0 && <p className="p-10 text-center text-xs text-neutral-400 dark:text-zinc-600 font-medium">No bookings yet</p>}
                        </div>
                    </div>

                    {/* Upcoming Games */}
                    <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                        <SectionHeader icon={Trophy} title="Upcoming Games" count={upcomingGames.length} />
                        <div className="divide-y divide-neutral-50 dark:divide-zinc-800/30">
                            {upcomingGames.map(g => (
                                <div key={g.id} className="px-5 py-3.5 hover:bg-lime-50/30 dark:hover:bg-lime-400/[0.02] transition-colors">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <p className="text-sm font-medium text-neutral-800 dark:text-zinc-200">
                                            {g.home_team?.name} <span className="text-neutral-300 dark:text-zinc-700 mx-1">vs</span> {g.away_team?.name}
                                        </p>
                                        <StatusBadge status={g.status} />
                                    </div>
                                    <p className="text-[11px] text-neutral-400 dark:text-zinc-600 font-mono">{new Date(g.scheduled_at).toLocaleString()} • {g.facility?.name || 'TBA'}</p>
                                </div>
                            ))}
                            {upcomingGames.length === 0 && <p className="p-10 text-center text-xs text-neutral-400 dark:text-zinc-600 font-medium">No upcoming games</p>}
                        </div>
                    </div>
                </div>

                {/* Announcements */}
                <div className="rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                    <SectionHeader icon={Megaphone} title="Announcements" count={announcements.length} />
                    <div className="divide-y divide-neutral-50 dark:divide-zinc-800/30">
                        {announcements.map(a => (
                            <div key={a.id} className="px-5 py-4 hover:bg-lime-50/30 dark:hover:bg-lime-400/[0.02] transition-colors">
                                <div className="flex items-center gap-2.5 mb-1.5">
                                    <StatusBadge status={a.priority} />
                                    <h4 className="text-sm font-medium text-neutral-800 dark:text-zinc-200">{a.title}</h4>
                                </div>
                                <p className="text-xs text-neutral-500 dark:text-zinc-500 line-clamp-2 leading-relaxed">{a.body}</p>
                            </div>
                        ))}
                        {announcements.length === 0 && <p className="p-10 text-center text-xs text-neutral-400 dark:text-zinc-600 font-medium">No announcements</p>}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
