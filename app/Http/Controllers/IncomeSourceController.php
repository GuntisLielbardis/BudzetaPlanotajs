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
        return response()->json(['message' => 'Ienākumu avots saglabāts veiksmīgi']);
    } 

    public function index()
    {
        $incomeSources = IncomeSource::all();
        $sum = $incomeSources->sum("amount");
        return response()->json(["incomeSources" => $incomeSources, "sum" => $sum]);
    }

    public function update(Request $request, $id)
    {
        $incomeSource = IncomeSource::findOrFail($id);
        $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'currency' => 'required|string',
        ]);

        $incomeSource->update([
            'description' => $request->description,
            'amount' => $request->amount,
            'currency' => $request->currency,
        ]);
        return response()->json(['message' => 'Ienākumu avots atjaunināts!']);
    }

    public function destroy(IncomeSource $incomeSource)
    {
        if ($incomeSource) {
            $incomeSource->delete();
            return response()->json(['message' => 'Ienākumu avots veiksmīgi dzēsts.']);
        } 
        else 
        {
            return response()->json(['message' => 'Ienākumu avots netika atrasts.'], 404);
        }
    }
}