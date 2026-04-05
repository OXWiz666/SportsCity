<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255|regex:/^[a-zA-Z\s\-]+$/',
            'middle_name' => 'nullable|string|max:255|regex:/^[a-zA-Z\s\-]+$/',
            'last_name' => 'required|string|max:255|regex:/^[a-zA-Z\s\-]+$/',
            'birthdate' => 'required|date|before:today|after:1900-01-01',
            'gender' => 'required|string|in:male,female',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'first_name.regex' => 'First name may only contain letters, spaces, and hyphens.',
            'middle_name.regex' => 'Middle name may only contain letters, spaces, and hyphens.',
            'last_name.regex' => 'Last name may only contain letters, spaces, and hyphens.',
            'birthdate.before' => 'Date of birth must be before today.',
            'birthdate.after' => 'Please enter a valid date of birth.',
            'gender.in' => 'Please select a valid gender.',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return to_route('login')->with('status', 'Registration successful! Please log in to continue.');
    }
}
