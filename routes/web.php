<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProdukController;

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

Route::get('/produk/{title}', [HomeController::class, 'produk'])->name('produk.detail');

Route::get('/admin-page', [AdminController::class, 'index'])->name('admin.index');

Route::get('/user/profile', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');

Route::get('/kurir', function () {
  return Inertia::render('Kurir');
})->name('kurir.index');

require __DIR__ . '/auth.php';
