<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Toko extends Model
{
  use HasFactory;

  protected $guarded = ['id'];

  protected $hidden = ['password'];

  public function user()
  {
    return $this->belongsTo(User::class, "idUser");
  }

  public function produks()
  {
    return $this->hasMany(Produk::class, "idToko");
  }
}
