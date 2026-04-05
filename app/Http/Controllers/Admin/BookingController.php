<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Notifications\BookingApproved;
use App\Notifications\BookingRejected;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['user', 'facility'])
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->search, fn($q, $s) => $q->whereHas('user', fn($uq) => $uq->where('first_name', 'like', "%{$s}%")->orWhere('last_name', 'like', "%{$s}%"))
                ->orWhereHas('facility', fn($fq) => $fq->where('name', 'like', "%{$s}%")))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/bookings', [
            'bookings' => $bookings,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate(['status' => 'required|in:approved,rejected,cancelled']);

        $booking->update(['status' => $request->status]);

        if ($request->status === 'approved') {
            $booking->user->notify(new BookingApproved($booking));
        } elseif ($request->status === 'rejected') {
            $booking->user->notify(new BookingRejected($booking));
        }

        return back()->with('success', 'Booking status updated.');
    }
}
