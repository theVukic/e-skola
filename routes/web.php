<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resource rute za teachers
    Route::resource('teachers', TeacherController::class)
        ->only(['index','create','store','edit','update','destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';