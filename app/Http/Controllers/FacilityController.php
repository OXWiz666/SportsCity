<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index(Request $request)
    {
        $facilities = Facility::where('status', 'active')
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->type, fn($q, $t) => $q->where('type', $t))
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('facilities/index', [
            'facilities' => $facilities,
            'filters' => $request->only('search', 'type'),
        ]);
    }
}
