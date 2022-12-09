<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KurirController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KeranjangController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('index');

Route::get('/produk/{namaProduk}', [HomeController::class, 'produk'])->name('produk.detail');

Route::get('/toko/{namaToko}', [HomeController::class, 'toko'])->name('toko');

Route::middleware('auth',)->group(function () {
  Route::get('/user/profile', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');

  Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');

  Route::get('/admin-page', [AdminController::class, 'index'])->name('admin.index');

  Route::get('/kurir', function () {
    return Inertia::render('Kurir');
  })->name('kurir.index');

  Route::get('/kurir/profile/{id}', [KurirController::class, 'edit'])->name('kurir.edit');
});

// Route::get('/kurir/profile', function () {
//   return Inertia::render('ProfilKurir');
// })->name('profilKurir');

require __DIR__ . '/auth.php';
