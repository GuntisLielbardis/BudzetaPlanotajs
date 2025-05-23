<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseSource extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'amount',
        'currency',
        'updated_at'
    ];
}