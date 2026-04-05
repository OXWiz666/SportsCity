import { LucideIcon } from 'lucide-react';
import { useCountUp } from '@/hooks/use-count-up';

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    delay?: number;
}

export default function StatCard({ title, value, icon: Icon, delay = 0 }: StatCardProps) {
    const { count, ref } = useCountUp(value, 1400);

    return (
        <div
            ref={ref}
            className="group relative rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 p-5 transition-all duration-500 hover:border-lime-300 dark:hover:border-lime-400/30 hover:shadow-lg hover:shadow-lime-400/5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-lime-50 dark:bg-lime-400/10 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400 group-hover:scale-110">
                    <Icon className="w-4 h-4 text-lime-600 dark:text-lime-400 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-zinc-500">{title}</p>
            </div>
            <p className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white tabular-nums">
                {count.toLocaleString()}
            </p>
            <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lime-400/0 to-transparent group-hover:via-lime-400/40 transition-all duration-700" />
        </div>
    );
}
