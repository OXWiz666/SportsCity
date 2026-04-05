<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FacilityController;
use App\Http\Controllers\Admin\LeagueController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:Admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::put('users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');

    Route::get('facilities', [FacilityController::class, 'index'])->name('facilities.index');
    Route::post('facilities', [FacilityController::class, 'store'])->name('facilities.store');
    Route::put('facilities/{facility}', [FacilityController::class, 'update'])->name('facilities.update');
    Route::delete('facilities/{facility}', [FacilityController::class, 'destroy'])->name('facilities.destroy');

    Route::get('bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::put('bookings/{booking}', [BookingController::class, 'updateStatus'])->name('bookings.updateStatus');

    Route::get('leagues', [LeagueController::class, 'index'])->name('leagues.index');
    Route::post('leagues', [LeagueController::class, 'store'])->name('leagues.store');
    Route::put('leagues/{league}', [LeagueController::class, 'update'])->name('leagues.update');

    Route::get('announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::post('announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
    Route::delete('announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');
});
