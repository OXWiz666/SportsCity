<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Booking;
use App\Models\Game;
use App\Models\League;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory(20)->create();

        foreach ($users as $user) {
            $user->roles()->attach(
                \App\Models\Role::where('name', 'Athlete')->first()
            );
        }

        $statuses = ['pending', 'approved', 'rejected', 'approved', 'approved'];
        foreach ($users->take(12) as $i => $user) {
            Booking::create([
                'user_id' => $user->id,
                'facility_id' => rand(1, 5),
                'booking_date' => Carbon::now()->addDays(rand(1, 30))->toDateString(),
                'start_time' => sprintf('%02d:00', rand(6, 18)),
                'end_time' => sprintf('%02d:00', rand(19, 21)),
                'status' => $statuses[$i % count($statuses)],
                'purpose' => ['Basketball practice', 'Volleyball training', 'Team meeting', 'Friendly match', 'Fitness session'][$i % 5],
            ]);
        }

        $sports = ['Basketball', 'Volleyball', 'Football', 'Badminton'];
        $leagues = [];
        foreach ($sports as $i => $sport) {
            $leagues[] = League::create([
                'name' => "GenSan {$sport} League 2026",
                'sport_type' => $sport,
                'description' => "Official city-wide {$sport} league for General Santos City athletes.",
                'season' => 'Summer 2026',
                'status' => $i === 0 ? 'active' : ($i === 3 ? 'upcoming' : 'active'),
                'max_teams' => 8,
                'start_date' => Carbon::now()->subDays(rand(0, 30))->toDateString(),
                'end_date' => Carbon::now()->addDays(rand(30, 90))->toDateString(),
                'organizer_id' => 1,
            ]);
        }

        $teamNames = ['Thunder', 'Storm', 'Blaze', 'Titans', 'Hawks', 'Wolves', 'Eagles', 'Sharks'];
        foreach ($leagues as $league) {
            $leagueTeams = [];
            for ($t = 0; $t < 4; $t++) {
                $team = Team::create([
                    'name' => $teamNames[array_rand($teamNames)] . ' ' . substr($league->sport_type, 0, 3),
                    'league_id' => $league->id,
                    'captain_id' => $users->random()->id,
                ]);
                $team->members()->attach($users->random(3)->pluck('id'));
                $leagueTeams[] = $team;
            }

            for ($g = 0; $g < 3; $g++) {
                $home = $leagueTeams[$g];
                $away = $leagueTeams[($g + 1) % count($leagueTeams)];
                Game::create([
                    'league_id' => $league->id,
                    'home_team_id' => $home->id,
                    'away_team_id' => $away->id,
                    'facility_id' => rand(1, 5),
                    'scheduled_at' => Carbon::now()->addDays(rand(1, 60))->setHour(rand(8, 19)),
                    'status' => ['scheduled', 'scheduled', 'completed'][$g % 3],
                    'home_score' => $g === 2 ? rand(50, 100) : null,
                    'away_score' => $g === 2 ? rand(50, 100) : null,
                ]);
            }
        }

        $announcements = [
            ['title' => 'Summer League Registration Now Open', 'body' => 'Register your team for the 2026 Summer League. Early bird discount available until April 30. Visit the facilities page to book your practice slots.', 'priority' => 'high'],
            ['title' => 'Acharon Sports Complex Renovation', 'body' => 'The Acharon Sports Complex will undergo renovation from May 1-15. All bookings during this period will be rescheduled. Contact admin for details.', 'priority' => 'urgent'],
            ['title' => 'New Badminton Courts Available', 'body' => 'Two new badminton courts have been added to the Lagao Gymnasium. Book your slots now through the facility reservation system.', 'priority' => 'normal'],
        ];

        foreach ($announcements as $a) {
            Announcement::create(array_merge($a, [
                'author_id' => 1,
                'published_at' => now(),
            ]));
        }
    }
}
