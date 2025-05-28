<?php
namespace App\Http\Controllers;
use App\Models\ExpenseSource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ExpenseSourceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'updated_at' => 'nullable|date_format:Y-m-d',
            'category' => 'nullable|string|max:255',
        ]);

        if (empty($validatedData['category'])) {
            $validatedData['category'] = 'Cits';
        }

        $validatedData['user_id'] = $request->user()->id;
        ExpenseSource::create($validatedData);
        return response()->json(['message' => 'Izdevumu avots saglabāts veiksmīgi']);
    } 

    public function index(Request $request)
    {
        $month = $request->query('month');
        $category = $request->query('category');

        Log::info('ExpenseSources index request parameters:', [
            'user_id' => Auth::id(),
            'month' => $month,
            'category' => $category
        ]);

        $userExpenseSourcesQuery = Auth::user()->expenseSources();

        if ($month) {
            $userExpenseSourcesQuery->whereMonth('updated_at', $month);
        }

        if ($category && $category !== 'Visas kategorijas') {
            $userExpenseSourcesQuery->where('category', $category);
        }

        $filteredExpenseSources = $userExpenseSourcesQuery->get();
        $sum = $filteredExpenseSources->sum('amount');

        return response()->json([
            "expenseSources" => $filteredExpenseSources,
            "sum" => $sum
        ]);
    }

    public function update(Request $request, $id)
    {
        Log::info('Expense update request received:', $request->all());
        $expenseSource = ExpenseSource::findOrFail($id);
        $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'updated_at' => 'nullable|date_format:Y-m-d',
            'category' => 'nullable|string|max:255',
        ]);

        if (empty($validatedData['category'])) {
            $validatedData['category'] = 'Cits';
        }

        $expenseSource->update([
            'description' => $request->description,
            'amount' => $request->amount,
            'currency' => $request->currency,
            'updated_at' => $request->updated_at,
            'category' => $request->category,
        ]);
        return response()->json(['message' => 'Izdevumu avots atjaunināts!']);
    }

    public function destroy(ExpenseSource $expenseSource)
    {
        if ($expenseSource) {
            $expenseSource->delete();
            return response()->json(['message' => 'Izdevumu avots veiksmīgi dzēsts.']);
        } 
        else 
        {
            return response()->json(['message' => 'Izdevumu avots netika atrasts.'], 404);
        }
    }
}