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
            'currency' => 'required|string'
        ]);
        ExpenseSource::create($validatedData);
        return response()->json(['message' => 'Expense source saved successfully']);
    } 

    public function index()
    {
        $expenseSources = ExpenseSource::all();
        $sum = $expenseSources->sum("amount");
        return response()->json(["expenseSources" => $expenseSources, "sum" => $sum]);
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
        return response()->json(['message' => 'Ienākumu avots atjaunināts!']);
    }

    public function destroy(ExpenseSource $expenseSource)
    {
        if ($expenseSource) {
            $expenseSource->delete();
            return response()->json(['message' => 'Expense source deleted successfully.']);
        } 
        else 
        {
            return response()->json(['message' => 'Expense source not found.'], 404);
        }
    }
}