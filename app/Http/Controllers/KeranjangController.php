<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KeranjangController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $keranjang = Keranjang::where('id', auth()->user()->id)->get();
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
    $request->validate([
      'jumlah' => 'required',
    ]);

    Keranjang::create([
      'namaProduk' => $request->namaProduk,
      'jumlah' => $request->jumlah,
      'hrgBeli' => $request->hrgBeli,
      'hrgJual' => $request->hrgJual,
      'idToko' => $request->idToko,
      'idUser' => $request->idUser,
    ]);
    return back()->with('message', 'Berhasil ditambah ke keranjang!');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Keranjang  $keranjang
   * @return \Illuminate\Http\Response
   */
  public function show(Keranjang $keranjang)
  {
    $keranjang = Keranjang::where('id', auth()->user()->id)->get();
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Keranjang  $keranjang
   * @return \Illuminate\Http\Response
   */
  public function edit(Keranjang $keranjang)
  {
    $keranjang = Keranjang::where('id', auth()->user()->id);
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Keranjang  $keranjang
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Keranjang $keranjang)
  {
    $keranjang = $request->validate([
      'jumlah' => 'required',
    ]);

    Keranjang::where('id', auth()->user()->id)->update($keranjang);
    return back()->with('message', 'Barang berhasil di update');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Keranjang  $keranjang
   * @return \Illuminate\Http\Response
   */
  public function destroy(Keranjang $keranjang, Request $request)
  {
    $keranjang = Keranjang::find($request->id);
    $keranjang->delete();
    return back()->with('message', 'Barang berhasil dihapus');
  }

  public function simpanOrder()
  {
    $keranjang = Keranjang::where('id', auth()->user()->id)->get();
    $noFaktur = date('ymd') . Str::random(5);
    $data = [];
    foreach ($keranjang as $key => $value) {
      $data[] = [
        'noFaktur' => $noFaktur,
        'idProduk' => $value->idProduk,
        'namaProduk' => $value->namaProduk,
        'jumlah' => $value->jumlah,
        'hrgBeli' => $value->hrgBeli,
        'hrgJual' => $value->hrgJual,
      ];
    }
    $order = DB::table('orders')->insert($data);

    $total = 0;
    foreach ($keranjang as $key => $value) {
      $total += $value['hrgJual'] * $value['jumlah'];
    }

    $dataRinci = [
      'noFaktur' => $noFaktur,
      'idOrder' => $order,
      'idUser' => auth()->user()->id,
      'jumlah' => $keranjang->sum('jumlah'),
      'total' => $total,
      'statusBayar' => 'belum bayar',
      'metodeBayar' => '',
      'statusOrder' => 'dikemas',
      'idKurir' => '',
      'statusKurir' => '',
      'buktiName' => '',
      'buktiUrl' => '',
      'buktiSamapaiName' => '',
      'buktiSamapaiUrl' => '',
    ];

    $order = DB::table('rinci_orders')->insert($dataRinci);
    return redirect()->to('/print');
  }
}
