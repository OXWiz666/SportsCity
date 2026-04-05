import { useAppearance } from '@/hooks/use-appearance';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Moon, Sun, Monitor } from 'lucide-react';
import type { Appearance } from '@/hooks/use-appearance';

const modes: { value: Appearance; icon: React.ElementType; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'Auto' },
];

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:p-0">
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800/60 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:gap-0.5">
                            {modes.map(({ value, icon: Icon, label }) => (
                                <button
                                    key={value}
                                    onClick={() => updateAppearance(value)}
                                    title={label}
                                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all group-data-[collapsible=icon]:p-1.5 group-data-[collapsible=icon]:rounded-lg ${
                                        appearance === value
                                            ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                                            : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                                </button>
                            ))}
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
