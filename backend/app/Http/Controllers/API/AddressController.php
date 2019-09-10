<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    public $successStatus = 200;

    /**
     * @return JsonResponse
     */
    public function getAll(): JsonResponse
    {
        $user = Auth::user();
        $addresses = Address::where('user_id', $user->id)->get();
        return response()->json($addresses, $this->successStatus);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'street_address' => 'required',
            'postal_code' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $user = Auth::user();
        $address = new Address;
        $address->user_id = $user->id;
        $address->street_address = $input['street_address'];
        $address->postal_code = $input['postal_code'];
        $address->city = $input['city'];
        $address->state = $input['state'];
        $address->country = $input['country'];
        $address->save();
        return response()->json(['success' => $address], $this->successStatus);

    }

}
