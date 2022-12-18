<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Inertia\Inertia;

class ProdukController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $produk = Produk::where('idToko', auth()->user()->idToko ?? '')->paginate(10)->withQueryString();
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
    return Inertia::render('TokoProduk/TokoProdukCreate', [
      'title' => 'Tambah Produk',
    ]);
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
      $file = $request->file('imgName');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();

      $id = Produk::create([
        'namaProduk' => $request->namaProduk,
        'slug' => Str::slug($request->namaProduk),
        'idKategori' => $request->idKategori,
        'idKategoriGlobal' => $request->idKategoriGlobal,
        'idSatuan' => $request->idSatuan,
        'deskripsi' => $request->deskripsi,
        'hrgBeli' => $request->hrgBeli,
        'hrgJual' => $request->hrgJual,
        'stokToko' => $request->stokToko,
        'stokGudang' => $request->stokGudang,
        'terjual' => $request->terjual,
        'diskon' => $request->diskon,
        'tglAwalDiskon' => $request->tglAwalDiskon,
        'tglAkhirDiskon' => $request->tglAkhirDiskon,
        'imgName' => $public_id,
        'imgUrl' => $url,
        'idToko' => $request->idToko,
      ]);
    }
    $produk = Produk::find($id);

    if ($request->hasFile('images')) {
      $file = $request->file('images');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();
      $produk->update([
        'imgName' => $public_id,
        'imgUrl' => $url,
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
  public function show(Produk $produk, Request $request)
  {
    $produk = Produk::find($request->id);
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function edit(Produk $produk, Request $request)
  {
    $produk = Produk::find($request->id);
    return Inertia::render('TokoProduk/TokoProdukEdit', [
      'title' => 'Edit Produk'
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Produk $produk, $id)
  {
    $produk = Produk::find($id);
    $request->validate(
      [
        'namaProduk' => 'required|max:225',
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

    $produk->update([
      'namaProduk' => $request->namaProduk,
      'slug' => Str::slug($request->namaProduk),
      'idKategori' => $request->idKategori,
      'idKategoriGlobal' => $request->idKategoriGlobal,
      'idSatuan' => $request->idSatuan,
      'deskripsi' => $request->deskripsi,
      'hrgBeli' => $request->hrgBeli,
      'hrgJual' => $request->hrgJual,
      'stokToko' => $request->stokToko,
      'stokGudang' => $request->stokGudang,
      'terjual' => $request->terjual,
      'diskon' => $request->diskon,
      'tglAwalDiskon' => $request->tglAwalDiskon,
      'tglAkhirDiskon' => $request->tglAkhirDiskon,
      'idToko' => $request->idToko,
    ]);

    if ($request->hasFile('imgName')) {
      $imgName = $produk->imgName;
      Cloudinary::destroy($imgName);

      $file = $request->file('imgName');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();

      $produk->update([
        'imgName' => $public_id,
        'imgUrl' => $url,
      ]);
    }

    if ($request->hasFile('images')) {
      $file = $request->file('images');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();
      Gambar::create([
        'imgName' => $public_id,
        'imgUrl' => $url,
        'idToko' => auth()->user()->idToko,
      ]);
    }

    return redirect()->to('/list-produk')->with('message', 'Berhasil ditambah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function destroy(Produk $produk, $id)
  {
    $produk = Produk::find($id);
    Cloudinary::destroy($produk->imgName);
    $images = Gambar::where('idProduk', $id)->get();
    foreach ($images as $key => $image) {
      Cloudinary::destroy($image->imgName);
    }
    $images->delete();
    $produk->delete();
    return back()->with('message', 'Produk berhasil dihapus');
  }
}
