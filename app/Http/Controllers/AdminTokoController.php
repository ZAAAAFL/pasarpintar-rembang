<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTokoController extends Controller
{
  public function index()
  {
    return Inertia::render('TokoAdmin', [
      "title" => "Admin Toko",
    ]);
  }
  public function list()
  {
    return Inertia::render('TokoProduk', [
      "title" => "Admin Toko Produk",
    ]);
  }
  public function kategori()
  {
    return Inertia::render('TokoAdminKategori', [
      "title" => "Admin Toko Kategori",
    ]);
  }
  public function setting()
  {
    return Inertia::render('TokoAdminSetting', [
      "title" => "Admin Toko Setting",
    ]);
  }
}
