<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
  public function today(Request $request)
  {
    $date = date('Y-m-d', strtotime(Carbon::now()));
    $data = Order::whereDay(['created_at' => $date, 'idToko' => auth()->user()->id])->get();
    return;
  }

  public function month(Request $request)
  {
    $month = date('m', strtotime($request->month));
    $year = date('Y', strtotime($request->year));
    $data = Order::whereMonth(['created_at' => [$month, $year]])->get();
    return;
  }

  public function year(Request $request)
  {
    $year = date('Y', strtotime($request->year));
    $data = Order::whereYear(['created_at' => $year])->get();
    return;
  }
}
