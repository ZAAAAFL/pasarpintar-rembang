<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Toko;
use Carbon\Carbon;
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
    $lamaBergabung = "";
    if ($produk->created_at->diffInYears(Carbon::now()) < 1) {
      $lamaBergabung = $produk->created_at->format('d F');
    } else {
      $lamaBergabung = $produk->created_at->diffInYears(Carbon::now()) . "tahun yang lalu";
    }

    return Inertia::render('Produk', [
      "toko" => [
        "namaToko" => $toko->namaToko,
        "slug" => $toko->slug,
        "jumlahProduk" => $produk->where("idToko", $toko->id)->count(),
        "lamaBergabung" => $lamaBergabung,
      ],
      "produk" => [
        "namaProduk" => $produk->namaProduk,
        "slug" => $produk->slug,
        "terjual" => $produk->terjual,
        "deskripsi" => $produk->deskripsi,
        "diskon" => $produk->diskon,
        "hrgJual" => $produk->hrgJual,
        "stok" => $produk->stokToko,
      ],
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
