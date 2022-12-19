<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminTokoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\KurirController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TokoController;
use Inertia\Inertia;

// home route
Route::get('/', [HomeController::class, 'index'])->name('index');

Route::get('/cari', [SearchController::class, 'search'])->name('pencarian');

Route::middleware('auth',)->group(function () {

  // route user
  Route::get('/user/profile', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  // route admin
  Route::get('/admin-page', [AdminController::class, 'index'])->name('admin.index');

  // route keranjang
  Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');


  //   Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');
  // });


  // route checkout
  Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');


  // route kurir
  Route::get('/kurir', function () {
    return Inertia::render('Kurir');
  })->name('kurir.index');

  // route edit kurir
  Route::get('/kurir/profile/{id}', [KurirController::class, 'edit'])->name('kurir.edit');
});

Route::get('/admin-page', [AdminController::class, 'index'])->name('admin.index');
Route::get('/admin-toko', [AdminController::class, 'toko'])->name('admin.toko');
Route::get('/admin-kategori', [AdminController::class, 'kategori'])->name('admin.kategori');
Route::get('/admin-setting', [AdminController::class, 'setting'])->name('admin.setting');
Route::get('/admin-toko/create', function () {
  return Inertia::render('AdminToko/TambahToko');
})->name('toko.create');

Route::get('/toko-page', [AdminTokoController::class, 'index'])->name('toko.index');

//route toko produk/list produk
Route::get('/toko-list', [AdminTokoController::class, 'list'])->name('toko.list');
Route::get('/toko-list/1/edit', [ProdukController::class, 'edit'])->name('produk.edit');
Route::get('/toko-list/create', [ProdukController::class, 'create'])->name('produk.create');

//route toko kategori
Route::get('/toko-kategori', [AdminTokoController::class, 'kategori'])->name('toko.kategori');
Route::get('/toko-kategori/1/edit', [KategoriController::class, 'edit'])->name('kategoriToko.edit');


Route::get('/toko-setting', [AdminTokoController::class, 'setting'])->name('toko.setting');

// route autentikasi
require __DIR__ . '/auth.php';

// route toko
Route::get('/{toko:slug}', [HomeController::class, 'toko'])->name('toko');

// route produk toko
Route::get('/{toko:slug}/{produk:slug}', [HomeController::class, 'produk'])->name('toko.produk')->scopeBindings();
