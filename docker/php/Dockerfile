FROM php:7.2-fpm
WORKDIR /app

RUN apt-get update
RUN apt-get install -y --no-install-recommends wget unzip zlib1g zlib1g-dev
RUN docker-php-ext-install zip
RUN wget -O - "https://getcomposer.org/installer" | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./server/composer.json /app/composer.json
RUN composer install -n
