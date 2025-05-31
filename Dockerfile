FROM richarvey/nginx-php-fpm:latest 
# Or a specific version like richarvey/nginx-php-fpm:php8.2-alpine
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts
COPY . .
RUN apt-get update && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install && \
    npm run build # Run your Vite build here
RUN php artisan optimize:clear \
    && php artisan view:clear \
    && php artisan route:clear \
    && php artisan config:clear
EXPOSE 80
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache