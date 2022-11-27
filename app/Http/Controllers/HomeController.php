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

    public function produk()
    {
      return Inertia::render('Produk', [
        "title" => "Produk",
      ]);
    }
}
