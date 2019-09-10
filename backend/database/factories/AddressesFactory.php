<?php

/** @var Factory $factory */

use App\Address;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use Faker\Provider\de_DE\Address as AddressProvider;


$factory->define(Address::class, function (Faker $faker) {
    $faker->addProvider(new AddressProvider($faker));
    return [
        'street_address' => $faker->streetAddress,
        'postal_code' => $faker->postcode,
        'city' => $faker->city,
        'state' => $faker->state,
        'country' => "Deutschland",
    ];
});
