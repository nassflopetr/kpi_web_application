FROM php:8.1-fpm

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y libzip-dev libpng-dev zip cron \
    && pecl install redis \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable redis \
    && docker-php-ext-install zip \
    && docker-php-ext-install gd \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php  --install-dir=/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

COPY root /var/spool/cron/crontabs/

RUN crontab /var/spool/cron/crontabs/root

CMD ["cron", "-f"]
