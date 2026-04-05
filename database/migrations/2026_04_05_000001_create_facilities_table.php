<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['court', 'field', 'gym', 'pool', 'track']);
            $table->string('location');
            $table->text('description')->nullable();
            $table->integer('capacity')->default(0);
            $table->decimal('hourly_rate', 8, 2)->default(0);
            $table->string('image_url')->nullable();
            $table->enum('status', ['active', 'maintenance', 'closed'])->default('active');
            $table->foreignId('managed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
