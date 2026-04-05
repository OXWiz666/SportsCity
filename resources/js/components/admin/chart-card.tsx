interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export default function ChartCard({ title, description, children, className = '' }: ChartCardProps) {
    return (
        <div className={`rounded-2xl border border-neutral-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/5 ${className}`}>
            <div className="px-6 pt-5 pb-3">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">{title}</h3>
                {description && <p className="text-[11px] text-neutral-400 dark:text-zinc-500 mt-0.5">{description}</p>}
            </div>
            <div className="px-3 pb-4">{children}</div>
        </div>
    );
}
