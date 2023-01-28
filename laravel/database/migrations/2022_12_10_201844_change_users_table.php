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
        Schema::table('users', function (Blueprint $table) {
            $table->string('last_name')->after('name')->nullable();
            $table->text('address')->after('last_name')->nullable();
            $table->string('phone')->unique()->after('address')->nullable();
            $table->boolean('admin')->after('email')->default(false);
            $table->renameColumn('name', 'first_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('last_name');
            $table->dropColumn('address');
            $table->dropColumn('phone');
            $table->dropColumn('admin');
            $table->renameColumn('first_name', 'name');
        });
    }
};
