<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            FacilitySeeder::class,
        ]);

        $admin = User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@sportscity.com',
            'password' => Hash::make('password'),
        ]);
        $admin->roles()->attach(Role::where('name', 'Admin')->first());

        $manager = User::factory()->create([
            'first_name' => 'Manager',
            'last_name' => 'User',
            'email' => 'manager@sportscity.com',
            'password' => Hash::make('password'),
        ]);
        $manager->roles()->attach(Role::where('name', 'Facility Manager')->first());

        $athlete = User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);
        $athlete->roles()->attach(Role::where('name', 'Athlete')->first());

        $this->call([
            SampleDataSeeder::class,
        ]);
    }
}
