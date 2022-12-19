<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KurirController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $kurir = User::paginate(10)->withQueryString();
    //
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('KurirToko/KurirTokoCreate', [
      'title' => 'Tambah Kurir',
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
        'namaKurir' => 'required',
        'email' => 'required|email|unique:kurirs,email',
        'password' => 'required|min:8',
        'alamat' => 'required',
        'noHp' => 'required|min:10|max:15',
      ],
      [
        'namaKurir.required' => 'Nama Kurir harus diisi',
        'email.required' => 'Email harus diisi!',
        'email.unique:kurirs,email' => 'Email sudah ada',
        'password.required' => 'Password harus diisi',
        'password.min:8' => 'Password minimal 8 karakter',
        'alamat.required' => 'Alamat harus diisi!',
        'noHp.required' => 'No handphone harus diisi!',
      ]
    );

    User::create($request->all());
    return back()->wiht('message', 'Kurir berhasil ditambah');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Kurir  $kurir
   * @return \Illuminate\Http\Response
   */
  public function show(User $kurir, Request $request)
  {
    $kurir = User::find($request->id);
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Kurir  $kurir
   * @return \Illuminate\Http\Response
   */
  public function edit()
  {
    // $auth = auth()->user()->id;
    // $kurir = User::find($id);
    return Inertia::render('KurirToko/KurirTokoEdit', [
      'title' => 'Edit Kurir',
    ]);
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Kurir  $kurir
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request)
  {
    $request->validate(
      [
        'namaKurir' => 'required',
        'email' => 'required|email|unique:kurirs,email',
        'password' => 'required|min:8',
        'alamat' => 'required',
        'noHp' => 'required|min:10|max:15',
      ],
      [
        'namaKurir.required' => 'Nama Kurir harus diisi',
        'email.required' => 'Email harus diisi!',
        'email.unique:kurirs,email' => 'Email sudah ada',
        'password.required' => 'Password harus diisi',
        'password.min:8' => 'Password minimal 8 karakter',
        'alamat.required' => 'Alamat harus diisi!',
        'noHp.required' => 'No handphone harus diisi!',
      ]
    );
    User::where(['id', $request->id])->update($request->all());
    return back()->wiht('message', 'Kurir berhasil ditambah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Kurir  $kurir
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user, Request $request)
  {
    $kurir = User::find($request->id);
    $kurir->delete();
    return back()->with('message', 'Kurir berhasil dihapus');
  }
}
