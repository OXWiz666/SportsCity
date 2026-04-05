<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\League;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeagueController extends Controller
{
    public function index(Request $request)
    {
        $leagues = League::with(['organizer', 'teams'])
            ->withCount(['teams', 'games'])
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('admin/leagues/index', [
            'leagues' => $leagues,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sport_type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'season' => 'nullable|string|max:255',
            'status' => 'required|in:upcoming,active,completed',
            'max_teams' => 'required|integer|min:2',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $validated['organizer_id'] = $request->user()->id;
        League::create($validated);
        return back()->with('success', 'League created.');
    }

    public function update(Request $request, League $league)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sport_type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'season' => 'nullable|string|max:255',
            'status' => 'required|in:upcoming,active,completed',
            'max_teams' => 'required|integer|min:2',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $league->update($validated);
        return back()->with('success', 'League updated.');
    }
}
