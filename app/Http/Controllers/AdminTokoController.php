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

  public function pesananBaru()
  {
    return Inertia::render('PesananToko/PesananBaru', [
      'title' => 'Pesanan Baru',
    ]);
  }

  public function konfirmasiBayar()
  {
    return Inertia::render('PesananToko/KonfirmasiBayar', [
      'title' => 'Konfirmasi Bayar',
    ]);
  }

  public function dikemas()
  {
    return Inertia::render('PesananToko/Dikemas', [
      'title' => 'Dikemas',
    ]);
  }

  public function dikirim()
  {
    return Inertia::render('PesananToko/Dikirim', [
      'title' => 'Dikirim',
    ]);
  }

  public function sampai()
  {
    return Inertia::render('PesananToko/Sampai', [
      'title' => 'Sampai',
    ]);
  }

  public function kurir()
  {
    return Inertia::render('KurirToko/KurirToko', [
      'title' => 'Kurir',
    ]);
  }
}
