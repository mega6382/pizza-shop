<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Pizza;

class PizzaController extends Controller
{
    public $successStatus = 200;

    /**
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        return response()->json(Pizza::all(), $this->successStatus);
    }

    /**
     * @param string $pizza_id
     * @return JsonResponse
     */
    public function getById(string $pizza_id): JsonResponse
    {
        return response()->json(Pizza::where('id', $pizza_id)->get(), $this->successStatus);
    }

}
