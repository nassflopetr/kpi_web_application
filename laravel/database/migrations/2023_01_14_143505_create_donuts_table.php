<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donuts', function (Blueprint $table) {
            $table->id();
            $table->string('src')->nullable(false);
            $table->string('title')->nullable(false);
            $table->text('description')->nullable(false);
            $table->unsignedInteger('price')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donuts');
    }
};
