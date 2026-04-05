import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Building2, CalendarCheck, Trophy, Megaphone, Bell } from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutGrid },
    { title: 'User Management', url: '/admin/users', icon: Users },
    { title: 'Facilities', url: '/admin/facilities', icon: Building2 },
    { title: 'Bookings', url: '/admin/bookings', icon: CalendarCheck },
    { title: 'Leagues', url: '/admin/leagues', icon: Trophy },
    { title: 'Announcements', url: '/admin/announcements', icon: Megaphone },
];

const userNavItems: NavItem[] = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
    { title: 'Browse Facilities', url: '/facilities', icon: Building2 },
    { title: 'My Bookings', url: '/bookings', icon: CalendarCheck },
    { title: 'Notifications', url: '/notifications', icon: Bell },
];

export function AppSidebar() {
    const { userRoles } = usePage<SharedData>().props;
    const isAdmin = userRoles.includes('Admin');

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isAdmin ? (
                    <NavMain items={adminNavItems} label="Administration" />
                ) : (
                    <NavMain items={userNavItems} label="Navigation" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <ThemeToggle />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
