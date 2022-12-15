<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin', [
      "title" => "Admin Page",
    ]);
  }
  public function toko()
  {
    return Inertia::render('AdminToko', [
      "title" => "Admin Toko",
    ]);
  }
  public function kategori()
  {
    return Inertia::render('AdminKategori', [
      "title" => "Admin Kategori",
    ]);
  }
  public function setting()
  {
    return Inertia::render('AdminSetting', [
      "title" => "Admin Setting",
    ]);
  }
}