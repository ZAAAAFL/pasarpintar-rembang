<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKurirsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('kurirs', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idUser');
      $table->foreignId('idToko')->nullable();
      $table->string('name');
      $table->string('email')->unique();
      // $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->string('no_hp', 17);
      $table->text('alamat');
      $table->string('statusKurir')->default('inactive');
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
    Schema::dropIfExists('kurirs');
  }
}
