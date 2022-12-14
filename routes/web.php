<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KurirController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KeranjangController;
use Inertia\Inertia;

// home route
Route::get('/', [HomeController::class, 'index'])->name('index');

Route::middleware('auth',)->group(function () {

  // route user
  Route::get('/user/profile', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  // route admin
  Route::get('/admin-page', [AdminController::class, 'index'])->name('admin.index');

  // route keranjang
  Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');

  // route checkout
  Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');

  // route kurir
  Route::get('/kurir', function () {
    return Inertia::render('Kurir');
  })->name('kurir.index');

  // route edit kurir
  Route::get('/kurir/profile/{id}', [KurirController::class, 'edit'])->name('kurir.edit');
});

// route autentikasi
require __DIR__ . '/auth.php';

// route toko
Route::get('/{toko:slug}', [HomeController::class, 'toko'])->name('toko');

// route produk toko
Route::get('/{namaToko}/{namaProduk}', [HomeController::class, 'produk'])->name('toko.produk');
