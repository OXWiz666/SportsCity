<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index(Request $request)
    {
        $facilities = Facility::with('manager')
            ->withCount('bookings')
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $managers = User::whereHas('roles', fn($q) => $q->whereIn('name', ['Admin', 'Facility Manager']))->get();

        return Inertia::render('admin/facilities/index', [
            'facilities' => $facilities,
            'managers' => $managers,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:court,field,gym,pool,track',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacity' => 'required|integer|min:0',
            'hourly_rate' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
            'status' => 'required|in:active,maintenance,closed',
            'managed_by' => 'nullable|exists:users,id',
        ]);

        Facility::create($validated);
        return back()->with('success', 'Facility created.');
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:court,field,gym,pool,track',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacity' => 'required|integer|min:0',
            'hourly_rate' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
            'status' => 'required|in:active,maintenance,closed',
            'managed_by' => 'nullable|exists:users,id',
        ]);

        $facility->update($validated);
        return back()->with('success', 'Facility updated.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();
        return back()->with('success', 'Facility deleted.');
    }
}
