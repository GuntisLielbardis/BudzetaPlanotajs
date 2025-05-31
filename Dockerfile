FROM richarvey/nginx-php-fpm:php8.2-alpine
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts
COPY package.json package-lock.json ./
RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install && \
    npm run build
COPY . .
RUN php artisan optimize:clear \
    && php artisan view:clear \
    && php artisan route:clear \
    && php artisan config:clear
EXPOSE 80
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache