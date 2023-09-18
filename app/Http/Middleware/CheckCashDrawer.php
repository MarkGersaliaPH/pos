<?php

namespace App\Http\Middleware;

use App\Models\CashDrawer;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckCashDrawer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Assuming each user belongs to a specific branch; adjust the logic as needed
        $branchId = $user->branch_id;

        $hasCashDrawerEntryToday = CashDrawer::whereDate('created_at', now()->toDateString())
            ->exists();
            // $hasCashDrawerEntryToday = CashDrawer::where('branch_id', $branchId)
            //     ->whereDate('created_at', now()->toDateString())
            //     ->exists();

        if (!$hasCashDrawerEntryToday) {
            // Store a session flash message 
            return back()->with('message','Please set the opening balance for the day before proceeding.');
            // Optionally, you can redirect the user to the page where they set the opening balance
            // return redirect()->route('setOpeningBalanceRoute');
        }

        return $next($request);

    }
}
