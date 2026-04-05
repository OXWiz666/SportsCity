<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Athlete', 'description' => 'A player in the sports league'],
            ['name' => 'Facility Manager', 'description' => 'Manages sports facilities'],
            ['name' => 'League Organizer', 'description' => 'Organizes leagues and tournaments'],
            ['name' => 'Admin', 'description' => 'Administrator'],
        ];

        foreach ($roles as $role) {
            \App\Models\Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}
