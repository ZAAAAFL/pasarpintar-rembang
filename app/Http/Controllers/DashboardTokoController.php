<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\RinciOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardTokoController extends Controller
{
  public function today()
  {
    $date = date('Y-m-d', strtotime(Carbon::now()));
    $data = RinciOrder::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->sum('total');
    return;
  }

  public function month()
  {
    $date = date('Y-m', strtotime(Carbon::now()));
    $data = RinciOrder::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->sum('total');
    return;
  }

  public function year()
  {
    $date = date('Y', strtotime(Carbon::now()));
    $data = RinciOrder::whereDay(['updated_at' => $date, 'idToko' => auth()->user()->id])->sum('total');
    return;
  }

  public function totalProduk()
  {
    $produk = Produk::where('idToko', auth()->user()->id)->count();
    return;
  }
}
