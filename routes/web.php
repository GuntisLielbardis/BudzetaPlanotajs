<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IncomeSourceController;
use App\Http\Controllers\ExpenseSourceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/income-sources', [IncomeSourceController::class, 'store']);
Route::get('/income-sources', [IncomeSourceController::class, 'index']);
Route::post('/expense-sources', [ExpenseSourceController::class, 'store']);
Route::get('/expense-sources', [ExpenseSourceController::class, 'index']);
Route::put('/income-sources/{id}', [IncomeSourceController::class, 'update']);
Route::delete('/income-sources/{incomeSource}', [IncomeSourceController::class, 'destroy']);
Route::put('/expense-sources/{id}', [ExpenseSourceController::class, 'update']);
Route::delete('/expense-sources/{expenseSource}', [ExpenseSourceController::class, 'destroy']);

require __DIR__.'/auth.php';