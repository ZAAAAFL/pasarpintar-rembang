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
      $table->string('namaKurir');
      $table->string('email')->unique();
      $table->string('password');
      $table->string('alamat');
      $table->string('noHp');
      $table->string('statusKurir'); //aktif atau in active
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
