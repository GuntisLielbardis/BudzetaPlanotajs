FROM richarvey/nginx-php-fpm:latest 
# Or a specific version like richarvey/nginx-php-fpm:php8.2-alpine
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts
COPY . .
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
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
**Important considerations for the `Dockerfile`:**
* **Base Image:** `richarvey/nginx-php-fpm` is a popular choice for Laravel Docker setups as it bundles Nginx and PHP-FPM. You can pick a specific PHP version (e.g., `richarvey/nginx-php-fpm:php8.2-alpine`).
* **Node.js/NPM:** The commands `curl ... nodejs` and `npm install && npm run build` are crucial for building your React/Vite frontend *inside* the Docker image during the build process.
* **Permissions:** `chown` and `chmod` ensure Laravel can write to `storage` and `bootstrap/cache`.
* **Database Migrations:** You generally **do not** run `php artisan migrate` in the `Dockerfile`. You run it as part of Render's "Build Command" or "Start Command" because migrations interact with your *external* database, not the Docker image itself.