<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRinciOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('rinci_orders', function (Blueprint $table) {
      $table->id();
      $table->string('noFaktur');
      $table->foreignId('idOrder');
      $table->foreignId('idUser');
      $table->bigInteger('jumlah')->default(0);
      $table->bigInteger('total')->default(0);
      $table->string('statusBayar')->default(0);
      $table->string('metodeBayar')->default(0);
      $table->string('statusOrder')->default(0);
      $table->bigInteger('idKurir')->nullable();
      $table->string('statusKurir')->nullable(); //active atau inactive
      $table->string('buktiName')->nullable(); //nama foto bukti sampai
      $table->string('buktiUrl')->nullable(); //url foto bukti sampai
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
    Schema::dropIfExists('rinci_orders');
  }
}
