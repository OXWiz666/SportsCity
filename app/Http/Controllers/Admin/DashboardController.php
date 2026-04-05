<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Facility;
use App\Models\League;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalFacilities = Facility::count();
        $totalBookings = Booking::count();
        $activeLeagues = League::where('status', 'active')->count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $activeFacilities = Facility::where('status', 'active')->count();

        $bookingsOverTime = Booking::selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get();

        $facilityUtilization = Facility::withCount(['bookings' => function ($q) {
            $q->where('status', 'approved');
        }])->get()->map(fn($f) => [
            'name' => $f->name,
            'bookings' => $f->bookings_count,
        ]);

        $leaguesBySport = League::selectRaw("sport_type, COUNT(*) as count")
            ->groupBy('sport_type')
            ->get();

        $userRegistrations = User::selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get();

        $recentBookings = Booking::with(['user', 'facility'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalFacilities' => $totalFacilities,
                'totalBookings' => $totalBookings,
                'activeLeagues' => $activeLeagues,
                'pendingBookings' => $pendingBookings,
                'activeFacilities' => $activeFacilities,
            ],
            'bookingsOverTime' => $bookingsOverTime,
            'facilityUtilization' => $facilityUtilization,
            'leaguesBySport' => $leaguesBySport,
            'userRegistrations' => $userRegistrations,
            'recentBookings' => $recentBookings,
        ]);
    }
}
