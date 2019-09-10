<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrdersTest extends TestCase
{
    private $token = '';

    protected function setUp(): void
    {
        parent::setup();
        $user = User::inRandomOrder()->first();
        if (Auth::attempt(['email' => $user->email, 'password' => 'password'])) {
            $user = Auth::user();
            $this->token = $user->createToken('MyApp')->accessToken;
        }
    }

    /**
     * @return void
     */
    public function testGetAllOrders(): void
    {
        $response = $this->get('/api/order/all', ['Authorization' => "Bearer {$this->token}", "Content-Type" => "application/json"]);
        $response->assertStatus(200);
    }
}
