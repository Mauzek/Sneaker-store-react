# Кроссы-и точка

![Логотип проекта](https://i.ibb.co/Kx1nkCH/logo-topaz-denoise-upscale-4x.png)

## Описание

**`Кроссы-и точка.`** — это интернет-магазин кроссовок, построенный на `React JS`. Здесь можно просматривать кроссовки по брендам, добавлять их в корзину, а также оформлять заказы. Используются современные библиотеки для создания приятного интерфейса и удобного взаимодействия с пользователем.

## Используемые библиотеки

Для работы проекта применяются следующие библиотеки:

- **`ant-design`**: набор иконок и элементы интерфейса.
- **`material UI`**: компоненты интерфейса.
- **`axios`**: работа с HTTP-запросами к API.
- **`lodash`**: набор утилит для работы с данными.
- **`zustand`**: библиотека для управления состоянием.

## Страницы

В проекте представлены следующие страницы:

- **`Главная` (home)**: стартовая страница с актуальными предложениями и акциями.
- **`Каталог` (catalog)**: просмотр кроссовок с возможностью фильтрации по брендам и категориям.
- **`Новинки` (new)**: страница с новыми поступлениями.
- **`Бренды` (brands)**: список доступных брендов.
- **`Корзина` (cart)**: управление товарами в корзине.
- **`Профиль` (profile)**: информация о пользователе и его заказах.
- **`Страница бренда` (sneakerBrands)**: отображение всех моделей выбранного бренда.
- **`Детали кроссовок` (sneakers)**: подробная информация о конкретной модели.

## API

Для работы с данными в проекте используются два **`MockAPI`**:

### API №1 - SneakersCard&&Users

**Endpoint**: `/sneakers`

Этот **`API`** содержит данные о кроссовках: их `ID`, `изображение`, `название`, `описание`, `категории`, `размеры`, `цену` и `количество` на складе. Пример структуры данных:
```json
{
  "id": 1,
  "image": "https://i.postimg.cc/brWfY8hF/jordan-1-retro-high-og-sp.png",
  "title": "Nike Air Max 1",
  "description": "Классические кроссовки Nike Air Max 1 для стильных и активных.",
  "category": ["popular"],
  "size": [
    { "value": 41, "price": 3700, "quantity": 31 },
    { "value": 42, "price": 4000, "quantity": 45 }
  ],
  "releaseDate": "08/26/2023",
  "material": ["Кожа 80%", "резина"],
  "brand": "nike"
}
```
**Endpoint**: `/users`

Этот **`API`** содержит данные о кроссовках: их `ID`, `дату создания`, `имя`, `фамилию`, `город`, `улицу`, `аватар`, `номер телефона`, `email` и `пароль`. Пример структуры данных:
```json
{
    "id": "1",
    "createdAt": "2024-08-05T11:18:33.818Z",
    "firstName": "Artyom",
    "lastName": "ittek",
    "addressCity": "Movkf",
    "addressStreet": "Psdfsdfsdf",
    "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1199.jpg",
    "phone": "82398492734",
    "email": "enjoyer@gmail.com",
    "password": "111111",
}
```

### API №1 - Cart&&Orders
**Endpoint**: `/carts`

Этот **`API`** предоставляет данные о содержимом корзины пользователя: `товары`, их `количество`, `цены`, а также общую `стоимость заказа`. Пример структуры данных:

```json
{
  "items": [
    {
      "id": 22,
      "image": "https://i.ibb.co/7YsddKN/jordan-1-retro-high-og-sp.png",
      "title": "Reebok Classic Leather 22",
      "description": "Стильные кроссовки Reebok Classic Leather 22 для повседневной носки.",
      "size": 40,
      "price": 3700,
      "quantity": 1
    },
    {
      "id": 11,
      "image": "https://i.ibb.co/7YsddKN/jordan-1-retro-high-og-sp.png",
      "title": "Puma Suede Classic 11",
      "description": "Эргономичные кроссовки Puma Suede Classic 11 для активного отдыха.",
      "size": 41,
      "price": 4700,
      "quantity": 1
    }
  ],
  "totalQuantity": 2,
  "totalPrice": 8400,
  "userId": "1",
  "cartId": "1"
}
```
**Endpoint**: `/orders`

Этот **`API`** содержит данные о заказах. Пока в разработке, пример структуры данных:
```json
{
  "createdAt": 1722948820,
  "status": "Оплачен",
  "totalAmount": 15000,
  "paymentMethod": "Карта",
  "shippingAddress": "г. Москва, ул. Пушкина, д. Колотушкина",
  "paymentStatus": "Завершено",
  "items": [
    {
      "id": 22,
      "title": "Reebok Classic Leather 22",
      "size": 40,
      "price": 3700,
      "quantity": 1
    }
  ],
  "userId": 1,
  "orderId": "1"
}
```
---
## Скриншоты
#### **`Главная страница`**
>![Главная страница](https://i.ibb.co/MpNDmS0/main.png) 

#### **`Страница новинок`**
>![Страница новинок](https://i.ibb.co/7gFtQLC/new.png)

#### **`Страница брендов`**
>![Страница брендов](https://i.ibb.co/rtynd7v/brands.png)

#### **`Страница каталога`**
>![Страница каталога](https://i.ibb.co/SRww2KF/catalog.png)

#### **`Страница корзины`**
>![Страница корзины](https://i.ibb.co/YjNv4nC/cart.png) 

#### **`Страница профиля`**
>![Страница профиля](https://i.ibb.co/0h2qRqf/profile.png)

#### **`Страница кроссовка`**
>![Страница кроссовка](https://i.ibb.co/XVBN2rW/sneakers.png) 
----
## Автор Mauzek(Артём)

Почта: artemilliy@gmail.com
[![Telegram](https://img.shields.io/badge/Telegram-blue?logo=telegram)](https://t.me/tralebys) [![VK](https://img.shields.io/badge/VK-4A76A8?style=for-the-badge&logo=vk&logoColor=white)](https://vk.com/tralebys)

