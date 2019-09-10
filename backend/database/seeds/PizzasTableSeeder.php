<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PizzasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pizzas')->insert([
            'name' => 'Pepperoni',
            'picture' => 'https://images.unsplash.com/photo-1564128442383-9201fcc740eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'description' => 'There\'s a reason this is one of the most popular types of pizza. Who doesnt love biting into a crispy, salty round of pepperoni?',
            'price' => '14.99',
            'size' => 'l',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Margherita',
            'picture' => 'https://images.unsplash.com/photo-1499778003268-cbafc6d08bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'description' => 'Deceptively simple, the Margherita pizza is made with basil, fresh mozzarella, and tomatoes. There\'s a reason it\'s an Italian staple and one of the most popular types of pizza in the country.',
            'price' => '9.99',
            'size' => 'm',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Hawaiian',
            'picture' => 'https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/1374-3-large.jpg?itok=sreY41A-',
            'description' => 'Pineapple might not be the first thing that comes to mind when you think pizza. But add in some ham and it creates an unexpectedly solid sweet and salty combination for this type of pizza.',
            'price' => '5.99',
            'size' => 's',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Supreme',
            'picture' => 'https://i2.wp.com/blog.slicelife.com/wp-content/uploads/2019/06/supreme-pizza-toppings.jpg?fit=1200%2C630&ssl=1',
            'description' => 'When you can\'t decide which toppings to get, it\'s time for the supreme pizza. The “supreme” refers to the litany of toppings that come scattered on these pies, from sausage to vegetables to pepperoni. And it\'s the combination of the flavors that really makes it sing.',
            'price' => '14.99',
            'size' => 'l',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Seafood',
            'picture' => 'https://images-gmi-pmc.edge-generalmills.com/57be9c18-f2e5-453c-9286-c96d3ddb9555.jpg',
            'description' => 'A wonderful pizza of the sea - perfect for summertime family-style meals.',
            'price' => '9.99',
            'size' => 'm',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Meat Lovers',
            'picture' => 'https://enzos.gofoodpng.biz/wp-content/uploads/2017/02/Meat-Eater.jpg',
            'description' => 'If pepperoni just isn\'t enough, and you\'re looking for a pie with a bit more heft, a meat pizza is a perfect and popular choice. Pile on ground beef and sausage for a hearty meal.',
            'price' => '5.99',
            'size' => 's',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Veggie',
            'picture' => 'https://images-gmi-pmc.edge-generalmills.com/32fb2446-1efc-434c-a053-7dabe8d963be.jpg',
            'description' => 'When you want to jazz up your cheese pizza with color and texture, veggies are the perfect topping. And you\'re only limited by your imagination. Everything from peppers and mushrooms, to eggplant and onions make for an exciting and tasty veggie pizza',
            'price' => '14.99',
            'size' => 'l',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'BBQ Chicken',
            'picture' => 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bbq-pizza-318-1547837614.jpg?crop=0.949xw:0.801xh;0,0.138xh&resize=480:*',
            'description' => 'If you love BBQ chicken and you love pizza, why not put them together? This has long been a cult favorite of sports fans and college kids. The chicken slathered over the top of a pie gives it a tangy, sweet flavor that can\'t be beaten.',
            'price' => '9.99',
            'size' => 'm',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Buffalo',
            'picture' => 'https://cdn.cpnscdn.com/static.coupons.com/ext/kitchme/images/recipes/600x400/wingless-buffalo-chicken-pizza_1238.jpg',
            'description' => 'Who says your pizza has to be strictly tomato-sauce based? Branch out with some buffalo sauce on your pie. All its spicy, salty, buttery goodness is a natural pairing for pizza.',
            'price' => '5.99',
            'size' => 's',
        ]);
        DB::table('pizzas')->insert([
            'name' => 'Cheese',
            'picture' => 'https://courthousepizzanashua.com/wp-content/uploads/2016/10/larosas_cheese_pizzas.jpg',
            'description' => 'It should be no shocker that a classic is the statistical favorite. Cheese pizza is one of the most popular choices. It will always be a simple, unadorned masterpiece on its own.',
            'price' => '14.99',
            'size' => 'l',
        ]);
    }
}
