<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduksTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('produks', function (Blueprint $table) {
      $table->id();
      $table->string('namaProduk')->nullable();
      $table->string('slug')->nullable()->unique();
      $table->foreignId('idKategori')->nullable();
      $table->foreignId('idKategoriGlobal')->nullable();
      $table->foreignId('idSatuan')->nullable();
      $table->string('deskripsi')->nullable();
      $table->bigInteger('hrgBeli')->nullable();
      $table->bigInteger('hrgJual')->nullable();
      $table->bigInteger('stok')->nullable();
      $table->bigInteger('terjual')->nullable();
      $table->bigInteger('diskon')->nullable();
      $table->date('tglAwalDiskon')->nullable();
      $table->date('tglAkhirDiskon')->nullable();
      $table->string('imgName')->nullable();
      $table->string('imgUrl')->nullable();
      $table->foreignId('idToko')->nullable();
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
    Schema::dropIfExists('produks');
  }
}
