<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProdukController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    // $produk = Produk::where('idToko', auth()->user()->idToko ?? '')->latest()->paginate(10)->withQueryString();
    // return Inertia::render('ListProduk', [
    //   'produk' => $produk,
    // ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate(
      [
        'namaProduk' => 'required|max:225',
        'slug' => 'required|max:225',
        'idKategori' => 'required',
        'idKategoriGlobal' => 'required',
        'idSatuan' => 'required',
        'deskripsi' => 'required',
        'hrgBeli' => 'required',
        'hrgJual' => 'required',
        'stok' => 'required',
        'imgName' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      ],
      [
        'namaProduk.required' => 'Nama produk harus diisi!',
        'idKategori.required' => 'Kategori Toko harus dipilih!',
        'idKategoriGlobal.required' => 'Kategori Global harus dipilih!',
        'idSatuan.required' => 'Satuan harus dipilih!',
        'deskripsi.required' => 'Deskripsi harus diisi!',
        'hrgBeli.required' => 'Harga Beli harus diisi',
        'hrgJual.required' => 'Harga Jual harus diisi',
        'stok.required' => 'Stok harus diisi',
      ]
    );

    if ($request->hasFile('imgName')) {
      Produk::create([
        'namaProduk' => $request->namaProduk,
        'slug' => Str::slug($request->namaProduk),
        'idKategori' => $request->idKategori,
        'idSatuan' => $request->idSatuan,
        'deskripsi' => $request->deskripsi,
        'hrgBeli' => $request->hrgBeli,
        'hrgJual' => $request->hrgJual,
        'stok' => $request->stok,
        'terjual' => $request->terjual,
        'diskon' => $request->diskon,
        'tglAwalDiskon' => $request->tglAwalDiskon,
        'tglAkhirDiskon' => $request->tglAkhirDiskon,
        'imgName' => $request->cloud_img,
        'imgUrl' => $request->img_urls,
        'idToko' => $request->idToko,
      ]);
    }

    return redirect()->to('/list-produk')->with('message', 'Berhasil ditambah');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function show(Produk $produk)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function edit(Produk $produk)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Produk $produk)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function destroy(Produk $produk)
  {
    //
  }
}
