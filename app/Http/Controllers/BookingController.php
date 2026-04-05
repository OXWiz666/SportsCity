<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('facility')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(15);

        return Inertia::render('bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|exists:facilities,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'purpose' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $conflict = Booking::where('facility_id', $validated['facility_id'])
            ->where('booking_date', $validated['booking_date'])
            ->where('status', '!=', 'rejected')
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($validated) {
                $q->where(function ($q2) use ($validated) {
                    $q2->where('start_time', '<', $validated['end_time'])
                        ->where('end_time', '>', $validated['start_time']);
                });
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors(['start_time' => 'This time slot conflicts with an existing booking.']);
        }

        $validated['user_id'] = auth()->id();
        Booking::create($validated);

        return redirect()->route('bookings.index')->with('success', 'Booking request submitted.');
    }
}
