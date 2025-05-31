<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncomeSource extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'amount',
        'currency',
        'updated_at',
        'user_id',
    ];
    protected $casts = [
        'amount' => 'decimal:2',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}