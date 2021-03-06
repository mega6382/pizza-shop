<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('pizza_id');
            $table->foreign('pizza_id')->references('id')->on('pizzas');
            $table->float('sub_total_cost');
            $table->float('tax');
            $table->float('total_cost');
            $table->unsignedBigInteger('billing_address_id');
            $table->foreign('billing_address_id')->references('id')->on('addresses');
            $table->unsignedBigInteger('delivery_address_id');
            $table->foreign('delivery_address_id')->references('id')->on('addresses');
            $table->enum('status', ['placed', 'completed', 'cancelled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
