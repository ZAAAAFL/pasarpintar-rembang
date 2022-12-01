<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Rules\PhoneNumber;

class TokoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $toko = Toko::latest()->paginate(10)->withQueryString();
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
      'namaToko' => 'required',
      'namaPengelola' => 'required',
      'email' => 'required|email|unique:tokos,email',
      'password' => 'required|min:8',
      'noHp' => ['required', 'string', new PhoneNumber],
      'alamat' => 'required|min:10',
    ]);

    $user = User::create([
      'name' => $request->namaPengelola,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'no_hp' => $request->noHp,
      'alamat' => $request->alamat,
      'level' => 'toko',
    ]);

    Toko::create([
      'idUser' => $user,
      'namaTOko' => $request->namaToko,
      'namaPengelola' => $request->namaPengelola,
      'email' => $request->email,
      'password' => $request->password,
      'noHp' => $request->noHp,
      'alamat' => $request->alamat,
    ]);


    return back()->with('message', 'Toko berhasil di buat');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function show(Toko $toko, Request $request)
  {
    $toko = Toko::find($request->id);
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function edit(Toko $toko, Request $request)
  {
    $toko = Toko::find($request->id);
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Toko $toko)
  {
    $request->validate([
      'namaToko' => 'required',
      'namaPengelola' => 'required',
      'email' => 'required|email|unique:tokos,email',
      'password' => 'required|min:8',
      'noHp' => ['required', 'string', new PhoneNumber],
      'alamat' => 'required|min:10',
    ]);

    Toko::create([
      'namaTOko' => $request->namaToko,
      'slug' => Str::slug($request->namaToko),
      'namaPengelola' => $request->namaPengelola,
      'email' => $request->email,
      'password' => $request->password,
      'noHp' => $request->noHp,
      'alamat' => $request->alamat,
    ]);

    User::create([
      'name' => $request->namaPengelola,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'no_hp' => $request->noHp,
      'alamat' => $request->alamat,
      'level' => 'toko',
    ]);

    return back()->with('message', 'Toko berhasil di buat');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {
    $toko = Toko::find($request->id);
    $toko->delete();
    return back()->with('message', 'Toko berhasil di hapus');
  }
}
