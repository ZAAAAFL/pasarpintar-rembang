<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render('HomePage', [
      "title" => "HomePage",
    ]);
  }

  public function produk($namaToko, $namaProduk)
  {
    return Inertia::render('Produk', [
      "namaToko" => $namaToko,
      "namaProduk" => $namaProduk,
    ]);
  }

  public function toko($namaToko)
  {
    return Inertia::render('Toko', [
      "toko" => [
        "namaToko" => $namaToko,
      ]
    ]);
  }

  public function checkout()
  {
    return Inertia::render('Checkout', [
      'title' => 'Checkout',
    ]);
  }
}
