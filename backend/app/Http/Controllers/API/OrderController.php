<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Order;
use App\Pizza;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public $successStatus = 200;

    /**
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->with("pizza")->get();
        return response()->json($orders, $this->successStatus);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'pizza_id' => 'required',
            'billing_address_id' => 'required',
            'delivery_address_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $user = Auth::user();
        $pizza = Pizza::find($input['pizza_id']);
        $order = new Order;
        $order->user_id = $user->id;
        $order->pizza_id = $input['pizza_id'];
        $order->sub_total_cost = $pizza->price;
        $order->tax = 0;
        $order->total_cost = $pizza->price;
        $order->billing_address_id = $input['billing_address_id'];
        $order->delivery_address_id = $input['delivery_address_id'];
        $order->status = 'placed';
        $order->save();
        return response()->json(['success' => $order], $this->successStatus);
    }

    /**
     * @param string $order_id
     * @return JsonResponse
     */
    public function markCompleted(string $order_id): JsonResponse
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)->where('user_id', $user->id)->get();
        $order->status = 'completed';
        $order->save();
        return response()->json($order, $this->successStatus);
    }

    /**
     * @param string $order_id
     * @return JsonResponse
     */
    public function markCancelled(string $order_id): JsonResponse
    {
        $user = Auth::user();
        $order = Order::where('id', $order_id)->where('user_id', $user->id)->get();
        $order->status = 'cancelled';
        $order->save();
        return response()->json($order, $this->successStatus);
    }

}
