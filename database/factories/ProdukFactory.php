<?php

namespace Database\Factories;

use App\Models\Toko;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdukFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "namaProduk" => $this->faker->sentence(),
      "slug" => $this->faker->slug(6),
      "idToko" => Toko::pluck('id')->random(),
      "idKategori" => $this->faker->numberBetween(1, 10),
      "idKategoriGlobal" => $this->faker->numberBetween(1, 20),
      "idSatuan" => $this->faker->numberBetween(1, 12),
      "deskripsi" => $this->faker->paragraphs(3, true),
      "hrgBeli" => $this->faker->randomNumber(6, true),
      "hrgJual" => $this->faker->randomNumber(6, true),
      "stokToko" => $this->faker->randomNumber(3),
      "stokGudang" => $this->faker->randomNumber(3),
      "terjual" => $this->faker->randomNumber(4),
      // "diskon",
      // "tglAwalDiskon",
      // "tglAkhirDiskon",
      // "imgName",
      // "imgUrl"
    ];
  }
}
