<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Trigger extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    DB::unprepared(
      'CREATE TRIGGER `updateStok` AFTER INSERT ON `orders`
         FOR EACH ROW BEGIN
            UPDATE produks set stokToko = stokToko - NEW.jumlah where id = NEW.idProduk AND statusOrder = "dikonfirmasi";
        END'
    );
    DB::unprepared(
      'CREATE TRIGGER `updateTerjual` AFTER INSERT ON `orders`
         FOR EACH ROW BEGIN
            UPDATE produks set terjual = terjual + NEW.jumlah where id = NEW.idProduk AND statusOrder = "dikonfirmasi";
        END'
    );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    DB::unprepared('DROP TRIGGER trigger');
  }
}
