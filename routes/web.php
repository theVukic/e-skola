<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Resource rute za teachers
    Route::resource('teachers', TeacherController::class)
        ->parameters(['teachers' => 'id'])
        ->only(['index','create','store','edit','update','destroy']);

    // Resource rute za students
    Route::resource('students', StudentController::class)
        ->parameters(['students' => 'id']) 
        ->only(['index','create','store','edit','update','destroy']);

    // Resource rute za courses
    Route::resource('courses', CourseController::class)
        ->parameters(['courses' => 'id']) 
        ->only(['index','create','store','edit','update','destroy']);
    
    // Resource rute za enrollments
    Route::resource('enrollments', EnrollmentController::class)
        ->parameters(['enrollments' => 'id']) 
        ->only(['index','create','store','edit','update','destroy']);

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';