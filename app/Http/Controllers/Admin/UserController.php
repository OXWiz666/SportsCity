<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('roles')
            ->when($request->search, fn($q, $s) => $q->where('first_name', 'like', "%{$s}%")
                ->orWhere('last_name', 'like', "%{$s}%")
                ->orWhere('email', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/users', [
            'users' => $users,
            'roles' => Role::all(),
            'filters' => $request->only('search'),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate(['roles' => 'required|array', 'roles.*' => 'exists:roles,id']);
        $user->roles()->sync($request->roles);
        return back()->with('success', 'User roles updated.');
    }
}
