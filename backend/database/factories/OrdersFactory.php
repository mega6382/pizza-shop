<?php

/** @var Factory $factory */

use App\Order;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Order::class, function (Faker $faker) {
    $user = factory(App\User::class)->create();
    $pizza = $faker->randomElement(App\Pizza::all());
    $address = factory(App\Address::class)->create(['user_id' => $user->id]);
    $status = $faker->randomElement( ['placed', 'completed', 'cancelled']);
    return [
        'user_id' => $user->id,
        'pizza_id' => $pizza->id,
        'sub_total_cost' => $pizza->price,
        'tax' => 0,
        'total_cost' => $pizza->price,
        'billing_address_id' => $address->id,
        'delivery_address_id' => $address->id,
        'status' => $status,
    ];
});
