<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PizzaTest extends TestCase
{
    private $token = '';

    /**
     * @return void
     */

    public function testGetAllPizzas(): void
    {
        $response = $this->get('/api/pizzas');
        $response->assertStatus(200);
    }
}
