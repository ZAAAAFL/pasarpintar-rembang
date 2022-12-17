<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render('HomePage', [
      "title" => "HomePage",
      "produk" => [
        "produkTerlaris" => Produk::with(['toko' => function ($q) {
          $q->select('id', 'slug as slugToko');
        }])->select('produks.idToko', 'produks.namaProduk as namaProduk', 'produks.slug as slugProduk', 'produks.hrgJual', 'produks.terjual as terjual', 'produks.imgUrl as produkImg')->orderBy('terjual', 'desc')->limit(10)->get()
      ],
    ]);
  }

  public function produk(Toko $toko, Produk $produk)
  {

    return Inertia::render('Produk', [
      "namaProduk" => $produk,
    ]);
  }

  public function toko(Toko $toko)
  {
    return Inertia::render('Toko', [
      "toko" => [
        "namaToko" => $toko->namaToko,
        "namaPengelola" => $toko->namaPengelola,
        "noHp" => $toko->noHp,
        "alamat" => $toko->alamat
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
