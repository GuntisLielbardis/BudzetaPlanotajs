<?php
namespace App\Http\Controllers;
use App\Models\IncomeSource;
use Illuminate\Http\Request;

class IncomeSourceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string'
        ]);

        IncomeSource::create($validatedData);

        return response()->json(['message' => 'Income source saved successfully']);
    }

    public function index()
    {
        $incomeSources = IncomeSource::all();
        return response()->json($incomeSources);
    }

    public function destroy($id)
    {
        $incomeSource = IncomeSource::find($id);
        if ($incomeSource) {
            $incomeSource->delete();
            return response()->json(['message' => 'Income source deleted successfully.']);
        } else {
            return response()->json(['message' => 'Income source not found.'], 404);
        }
    }
}
