<?php

namespace App\Http\Controllers;

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
  public function edit(KategoriGlobal $kategoriGlobal)
  {
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

    $data = [
      'namaKategoriGlobal' => 'required|max:255',
    ];
    $data['slug'] = Str::slug($request->namaKategoriGlobal);
    $validatedData = $request->validate($data);
    $kategoriGlobal->update($validatedData);
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
