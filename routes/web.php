<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resource rute za teachers
    Route::resource('teachers', TeacherController::class)
        ->parameters(['teachers' => 'id'])
        ->only(['index','create','store','edit','update','destroy']);

    // Resource rute za students
    Route::resource('students', StudentController::class)
        ->parameters(['students' => 'id']) 
        ->only(['index','create','store','edit','update','destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';