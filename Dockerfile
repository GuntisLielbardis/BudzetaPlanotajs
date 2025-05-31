```dockerfile
# Dockerfile
# Use a base image with Nginx and PHP-FPM
FROM richarvey/nginx-php-fpm:latest # Or a specific version like richarvey/nginx-php-fpm:php8.2-alpine

# Set working directory inside the container
WORKDIR /var/www/html

# Copy composer.json and composer.lock first to leverage Docker cache
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy the rest of the application code
COPY . .

# Install Node.js and npm (since you have React/Vite)
# Use nvm to install a specific Node.js version if needed
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install && \
    npm run build # Run your Vite build here

# Laravel specific optimizations
RUN php artisan optimize:clear \
    && php artisan view:clear \
    && php artisan route:clear \
    && php artisan config:clear

# Expose port (Nginx default is 80)
EXPOSE 80

# Ensure storage and bootstrap/cache are writable
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Start Nginx and PHP-FPM (this is typically handled by the base image's CMD)
# CMD ["nginx", "-g", "daemon off;"] # Or similar, depending on base image
# For richarvey/nginx-php-fpm, it usually starts both services automatically.
```

**Important considerations for the `Dockerfile`:**
* **Base Image:** `richarvey/nginx-php-fpm` is a popular choice for Laravel Docker setups as it bundles Nginx and PHP-FPM. You can pick a specific PHP version (e.g., `richarvey/nginx-php-fpm:php8.2-alpine`).
* **Node.js/NPM:** The commands `curl ... nodejs` and `npm install && npm run build` are crucial for building your React/Vite frontend *inside* the Docker image during the build process.
* **Permissions:** `chown` and `chmod` ensure Laravel can write to `storage` and `bootstrap/cache`.
* **Database Migrations:** You generally **do not** run `php artisan migrate` in the `Dockerfile`. You run it as part of Render's "Build Command" or "Start Command" because migrations interact with your *external* database, not the Docker image itself.