<?php

use App\Http\Controllers\Admin\CashDrawerController;
use App\Http\Controllers\Admin\PosController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InventoryCategoryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {


    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');


    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('products', ProductController::class);
        Route::resource('categories', CategoryController::class);
        
        Route::resource('inventories', InventoryController::class);
        Route::resource('inventory-categories', InventoryCategoryController::class);
        // Route::prefix('pos')->group(function () { 
        // Route::get('{id}', [PosController::class, 'show'])->name('pos.show');
        // Route::post('pos', [PosController::class, 'store'])->name('pos.store');
        // });
        Route::resource('pos',PosController::class)->only('show','store','index')->middleware('checkCashDrawer');
        Route::prefix('cash-drawer')->name('cash-drawer.')->group(function () {
            Route::get('sales/{cash_drawer_id}', [CashDrawerController::class, 'sales'])->name('sales');
            Route::get('logs/{cash_drawer_id}', [CashDrawerController::class, 'logs'])->name('logs');
            Route::post('cash_in_and_out/{cash_drawer_id}', [CashDrawerController::class, 'cashInAndOut'])->name('cash_in_and_out');
        });

        Route::resource('cash-drawer',CashDrawerController::class);
       
        Route::get('receipt/generate_pdf/{id}', [PosController::class, 'generatePdf'])->name('order.generatepdf');
    });



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
