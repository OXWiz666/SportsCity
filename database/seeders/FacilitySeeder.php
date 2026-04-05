<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Lagao Gymnasium',
                'type' => 'gym',
                'location' => 'Lagao, General Santos City',
                'description' => 'Multi-purpose indoor gymnasium for basketball, volleyball, and badminton.',
                'capacity' => 3000,
                'hourly_rate' => 500.00,
                'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
                'status' => 'active',
            ],
            [
                'name' => 'Oval Running Track',
                'type' => 'track',
                'location' => 'GenSan Oval, General Santos City',
                'description' => '400-meter standard oval running track with lanes for sprinting and distance events.',
                'capacity' => 500,
                'hourly_rate' => 200.00,
                'image_url' => 'https://images.unsplash.com/photo-1461896836934-bd45ba15a090?w=800&auto=format&fit=crop&q=80',
                'status' => 'active',
            ],
            [
                'name' => 'Acharon Sports Complex',
                'type' => 'field',
                'location' => 'Acharon, General Santos City',
                'description' => 'Outdoor sports field for football, rugby, and community events.',
                'capacity' => 5000,
                'hourly_rate' => 800.00,
                'image_url' => 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
                'status' => 'active',
            ],
            [
                'name' => 'City Basketball Court A',
                'type' => 'court',
                'location' => 'City Hall Complex, General Santos City',
                'description' => 'Outdoor basketball court with lighting for night games.',
                'capacity' => 200,
                'hourly_rate' => 150.00,
                'image_url' => 'https://images.unsplash.com/photo-1505666287802-931dc83948e5?w=800&auto=format&fit=crop&q=80',
                'status' => 'active',
            ],
            [
                'name' => 'City Basketball Court B',
                'type' => 'court',
                'location' => 'Calumpang, General Santos City',
                'description' => 'Covered basketball court suitable for league games.',
                'capacity' => 300,
                'hourly_rate' => 250.00,
                'image_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
                'status' => 'active',
            ],
            [
                'name' => 'Aquatic Center',
                'type' => 'pool',
                'location' => 'Dadiangas, General Santos City',
                'description' => 'Olympic-size swimming pool for training and competitions.',
                'capacity' => 400,
                'hourly_rate' => 600.00,
                'image_url' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&auto=format&fit=crop&q=80',
                'status' => 'maintenance',
            ],
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
