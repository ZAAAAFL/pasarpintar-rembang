<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\KategoriGlobal;
use Illuminate\Support\Str;

use Illuminate\Http\Request;

class KategoriGlobalController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $kategoriGlobal = KategoriGlobal::latest()->paginate(10)->withQueryString();
    //
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
    $data = $request->validate([
      'namaKategoriGlobal' => 'required',
    ]);
    $data['slug'] = Str::slug($request->namaKategoriGlobal);

    KategoriGlobal::create($data);
    return back()->with('message', 'Kategori global berhasil di tambah!');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function show(KategoriGlobal $kategoriGlobal)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function edit(KategoriGlobal $kategoriGlobal, $id)
  {
    $kategoriGlobal = KategoriGlobal::find($id);
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, KategoriGlobal $kategoriGlobal, $id)
  {
    $kategoriGlobal = KategoriGlobal::find($id);

    $request->validate([
      'namaKategoriGlobal' => 'required',
    ]);


    $data = [
      'namaKategoriGlobal' => $request->namaKategoriGlobal,
      'slug' => Str::slug($request->namaKategoriGlobal),
      'idToko' => auth()->user()->idToko,
    ];

    $kategoriGlobal->update($data);
    return back()->with('message', 'Kategori Global berhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function destroy(KategoriGlobal $kategoriGlobal, Request $request)
  {
    $kategoriGlobal = KategoriGlobal::find($request->id);
    $kategoriGlobal->delete();
    return back()->with('message', 'Kategori Global berhasil dihapus');
  }
}
