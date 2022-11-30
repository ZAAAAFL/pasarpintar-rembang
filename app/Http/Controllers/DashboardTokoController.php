<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Produk;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardTokoController extends Controller
{
  public function today()
  {
    $date = date('Y-m-d', strtotime(Carbon::now()));
    $data = Order::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->get();
    return;
  }

  public function month()
  {
    $date = date('Y-m', strtotime(Carbon::now()));
    $data = Order::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->get();
    return;
  }

  public function year()
  {
    $date = date('Y', strtotime(Carbon::now()));
    $data = Order::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->get();
    return;
  }

  public function totalProduk()
  {
    $produk = Produk::where('idToko', auth()->user()->id)->count();
    return;
  }
}
