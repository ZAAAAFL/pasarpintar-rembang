<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TokoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // "idUser" => $this->faker->numberBetween(1, 20),
            "namaToko" => $this->faker->words(3, true),
            "email" => $this->faker->email(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            "slug" => $this->faker->slug(3, false),
            "namaPengelola" => $this->faker->name(),
            "noHp" => $this->faker->e164PhoneNumber(),
            "alamat" => $this->faker->address(),
        ];
    }
}
