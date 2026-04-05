import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    userRoles: string[];
    unreadNotificationCount: number;
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface Facility {
    id: number;
    name: string;
    type: 'court' | 'field' | 'gym' | 'pool' | 'track';
    location: string;
    description: string | null;
    capacity: number;
    hourly_rate: number;
    image_url: string | null;
    status: 'active' | 'maintenance' | 'closed';
    managed_by: number | null;
    manager?: User;
    bookings_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: number;
    user_id: number;
    facility_id: number;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    purpose: string | null;
    notes: string | null;
    user?: User;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

export interface League {
    id: number;
    name: string;
    sport_type: string;
    description: string | null;
    season: string | null;
    status: 'upcoming' | 'active' | 'completed';
    max_teams: number;
    start_date: string | null;
    end_date: string | null;
    organizer_id: number | null;
    organizer?: User;
    teams?: Team[];
    teams_count?: number;
    games_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Team {
    id: number;
    name: string;
    league_id: number;
    captain_id: number | null;
    league?: League;
    captain?: User;
    members?: User[];
    created_at: string;
    updated_at: string;
}

export interface Game {
    id: number;
    league_id: number;
    home_team_id: number;
    away_team_id: number;
    facility_id: number | null;
    scheduled_at: string;
    home_score: number | null;
    away_score: number | null;
    status: 'scheduled' | 'live' | 'completed' | 'postponed';
    league?: League;
    home_team?: Team;
    away_team?: Team;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

export interface Announcement {
    id: number;
    title: string;
    body: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    author_id: number;
    published_at: string | null;
    expires_at: string | null;
    author?: User;
    created_at: string;
    updated_at: string;
}

export interface AppNotification {
    id: string;
    type: string;
    data: {
        type: string;
        message: string;
        [key: string]: unknown;
    };
    read_at: string | null;
    created_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
