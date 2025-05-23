<?php
namespace App\Http\Controllers;
use App\Models\ExpenseSource;
use Illuminate\Http\Request;

class ExpenseSourceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'updated_at' => 'nullable|date_format:Y-m-d'
        ]);
        ExpenseSource::create($validatedData);
        return response()->json(['message' => 'Izdevumu avots saglabāts veiksmīgi']);
    } 

    public function index(Request $request)
    {
        $month = $request->query('month');
        $expenseSources = ExpenseSource::query();
        if ($month) {
            $expenseSources->whereMonth('updated_at', $month);
        }
        $filteredExpenseSources = $expenseSources->get();
        $sum = $filteredExpenseSources->sum('amount');
        return response()->json(["expenseSources" => $filteredExpenseSources, "sum" => $sum]);
    }

    public function update(Request $request, $id)
    {
        $expenseSource = ExpenseSource::findOrFail($id);
        $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
        ]);

        $expenseSource->update([
            'description' => $request->description,
            'amount' => $request->amount,
            'currency' => $request->currency,
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