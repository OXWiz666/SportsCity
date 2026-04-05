<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Booking;
use App\Models\Game;
use App\Models\League;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $myBookings = Booking::with('facility')
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $upcomingGames = Game::with(['homeTeam', 'awayTeam', 'facility', 'league'])
            ->where('status', 'scheduled')
            ->where('scheduled_at', '>=', now())
            ->whereHas('homeTeam.members', fn($q) => $q->where('user_id', $user->id))
            ->orWhereHas('awayTeam.members', fn($q) => $q->where('user_id', $user->id))
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();

        $activeLeagues = League::where('status', 'active')->count();

        $announcements = Announcement::published()
            ->latest('published_at')
            ->take(3)
            ->get();

        $stats = [
            'totalBookings' => Booking::where('user_id', $user->id)->count(),
            'approvedBookings' => Booking::where('user_id', $user->id)->where('status', 'approved')->count(),
            'activeLeagues' => $activeLeagues,
        ];

        return Inertia::render('dashboard', [
            'myBookings' => $myBookings,
            'upcomingGames' => $upcomingGames,
            'announcements' => $announcements,
            'stats' => $stats,
        ]);
    }
}
