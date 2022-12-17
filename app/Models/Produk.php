<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
  use HasFactory;
  protected $guarded = ['id'];

  public function toko()
  {
    return $this->belongsTo(Toko::class, "idToko");
  }

  public function kategoriToko()
  {
    return $this->belongsTo(Kategori::class, "idKategori");
  }

  public function kategoriGlobal()
  {
    return $this->belongsTo(KategoriGlobal::class, "idKategoriGlobal");
  }

  // public function satuan()
  // {
  //   return $this->belongsTo()
  // }
}
