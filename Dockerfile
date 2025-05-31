FROM richarvey/nginx-php-fpm:latest
WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader
RUN apk add --no-cache nodejs npm && \
    npm install && \
    npm run build
RUN mkdir -p database && \
    touch database/database.sqlite && \
    chown -R www-data:www-data storage bootstrap/cache database && \
    chmod -R 775 storage bootstrap/cache database
RUN php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    php artisan optimize
# (Optional) Run migrations if you're using PostgreSQL later
# RUN php artisan migrate --force
EXPOSE 80