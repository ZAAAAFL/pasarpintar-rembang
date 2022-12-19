<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
  public function search(Request $request)
  {
    $querySearch = $request->input('query');

    $produk = Produk::with('toko')->where('namaProduk', 'like', '%' . $querySearch . '%')->get();

    return Inertia::render('Pencarian', [
      "query" => $querySearch,
      "hasil" => Produk::with(['toko' => function ($q) {
        $q->select('id', 'slug as slugToko');
      }])->select('produks.idToko', 'produks.namaProduk as namaProduk', 'produks.slug as slugProduk', 'produks.hrgJual', 'produks.terjual as terjual', 'produks.imgUrl as produkImg')->where('namaProduk', 'like', '%' . $querySearch . '%')->get()
    ]);
  }
}
