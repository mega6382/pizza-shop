FROM php:7.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    curl \
    nginx

RUN docker-php-ext-install pdo_mysql mbstring
# Create a directory where our app will be placed
RUN mkdir -p /var/www/html/

# Change directory so that our commands run inside this new directory
WORKDIR /var/www/html/

# Get all the code needed to run the app
COPY . /var/www/html/

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependecies
RUN composer install

# Expose port 9000 and start php-fpm server and nginx
EXPOSE 9000
CMD php-fpm
