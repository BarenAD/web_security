<p align="center"><img src="https://res.cloudinary.com/dtfbvvkyp/image/upload/v1566331377/laravel-logolockup-cmyk-red.svg" width="400"></p>

##Требования

#####Всё с: `https://laravel.com/docs/7.x#server-requirements`
#####composer
#####установленная субд

## Инструкция по развёртыванию
1. Копируем .env.example => .env
2. Настраиваем .env (Достаточно настроить только раздел базы данных) `DB_CONNECTION`,`DB_HOST`, `DB_PORT`, `DB_DATABASE`,`DB_USERNAME`,`DB_PASSWORD`
3. Вводим `composer install` в директории проекта
4. Вводим `php artisan key:generate` в директории проекта
5. Вводим `php artisan migrate` в директории проекта

## Запуск
`php artisan serve` в директории проекта
