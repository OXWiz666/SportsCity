import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], label = 'Platform' }: { items: NavItem[]; label?: string }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-600 mb-1">{label}</SidebarGroupLabel>
            <SidebarMenu className="space-y-0.5">
                {items.map((item) => {
                    const active = page.url.startsWith(item.url);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                className={active
                                    ? 'bg-lime-50 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border-l-2 border-lime-500 dark:border-lime-400 rounded-none font-bold'
                                    : 'text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 border-l-2 border-transparent'}
                            >
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon className={`!w-4 !h-4 ${active ? 'text-lime-500 dark:text-lime-400' : 'text-neutral-400 dark:text-zinc-500'}`} />}
                                    <span className="text-[13px]">{item.title}</span>
                                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400 animate-pulse" />}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
