<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {
    return Inertia::render('HomePage', [
      "title" => "HomePage",
    ]);
  }

  public function produk($title)
  {
    return Inertia::render('Produk', [
      "title" => $title,
    ]);
  }

  public function checkout()
  {
    return Inertia::render('Checkout', [
      'title' => 'Checkout',
    ]);
  }
}
