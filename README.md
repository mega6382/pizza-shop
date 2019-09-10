# PizzaShop
Online Pizza Shop Web Application

## Installation 
Because of docker-compose most of the installation process will be automated. We will only need to add a few configurations first.

This uses a proxy to serve backend and frontend on the same port 80.

You can launch the containers by running in the root directory:
```bash
docker-compose up --build
```
This will create the containers and will bring up our Mysql, Backend and Frontend servers. Both Backend and Frontend are offered via nginx.

So, once the containers are up, you can choose to run the migrations and seeders if you wish(but be sure to wait for the mysql socket to start), by simply executing:

```bash
docker exec -u root -it backend php artisan migrate:fresh --seed
```

Also, make sure that passport keys exist by running:

```bash
docker exec -u root -it backend php artisan passport:install
```

Now finally you can run the tests, the reason the tests are being run like this is because the DB is also a container and its state is unknown, like whether it already has the tables or not etc.

```bash
docker exec -u root -it backend ./vendor/bin/phpunit
```
The tests are only for backend, and there are only 3 tests and they are very simple and basic as well. They simply just check if the endpoints work or not.

# Usage

Using it is quite simple, the React frontend will be exposed on port 80 and you can use the Navigation bar and other buttons and links to browse around.

There are basically only 7 endpoints, that include login, logout, register, home, place order, orders list and profile.

If you run into any trouble with this please let me know I will be sure to help you in any way that I can.