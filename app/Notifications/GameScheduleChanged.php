<?php

namespace App\Notifications;

use App\Models\Game;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class GameScheduleChanged extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Game $game) {}

    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'game_schedule_changed',
            'message' => "Game schedule updated: {$this->game->homeTeam->name} vs {$this->game->awayTeam->name} now at {$this->game->scheduled_at->format('M d, Y h:i A')}.",
            'game_id' => $this->game->id,
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
}
