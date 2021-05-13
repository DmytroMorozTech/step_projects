#Степ-проект "Instagram copy"
Данный степ проект был выполнен 31.10.2020.

[Live version](https://instagram-step.herokuapp.com/)


### Данные для доступа в аккаунты разных юзеров:
email: k.brooks229@gmail.com
password: kevinkevin

email: bob.west233@gmail.com
password: bobbob

email: mary.ostin221@gmail.com
pasword: marymary

email: olga.iv223@ukr.net
password: olgaolga

email: viola-ernst-123@gmail.com
password: violaviola

email: andrew.brown2256@gmail.com
password: andrewandrew

email: antony_smith333@gmail.com
password: antonyantony


Он представляет собой упрощенный аналог социальной сети Instagram.
Основной функционал: после авторизации пользователь попадает на основную страницу, которая содержит ленту из постов (posts’ feed). Действия, которые доступны пользователю:
* Доступ к личной странице любого пользователя (при клике на его nickname).
* Доступ к любому посту – при клике на фотографию открывается модальное окно с данным постом.
* Пользователь может добавлять лайки к чужим постам, но не может "лайкать" свои посты. При попытке это сделать будет выведено уведомление, что данное действие недоступно.
* Добавление комментариев к любому посту.
* Под каждым постом справа находится иконка в виде флажка. Она отвечает за сохранение поста в коллекцию "SAVED данного пользователя. Просмотреть коллекцию сохраненных постов можно на личной странице пользователя. Там необходимо открыть вкладку "SAVED".
* Пользователь может подписаться/отписаться на/от любого другого пользователя соц. сети.


##Использованные технологии:

###FrontEnd:
* React JS: Redux, Hooks.
* React styles: material-ui.
* React libraries: axios; immutability-helper; jwt-decode; react-toastify; use-double-click; prop-types; cloudinary-react; see more in package.json;

###BackEnd: Node.js, Express.

###Database: MongoDB.

###Cloud storage: Cloudinary.

###Deployment server: Heroku.


##Распределение заданий между участниками проекта:
---
### Дмитрий Мороз
* BackEnd: Node.js, Express.
* Разработка структуры данных для MongoDB.
* Авторизация пользователя с помощью JWT. Сохранение хэшированных паролей в базе данных.
* Наполнение базы данных объектами.
* Интеграция облачного хранилища Cloudinary. Наполнение фотографиями.
* Проработка совместно с командой механизмов коммуникации front-end с back-end.
* Развертывание проекта на Heroku.
---
### Сергей Романюк
* Блок с подписками пользователя (Subscriptions).
* Блок с рекомендациями для подписки (People you may know).
* Настройка функционала Subscribe/Unsubscribe.
* Infinite scroll для ленты с постами.
---
### Михаил Величкевич
#### Разработка страниц и их функционал:
* General styles 
* Login page
* Personal page

#### Разработка компонентов и их функционал:
* CommentsRoutes
* ProtectedRoutes
* Header
* Menu
* ImageGrid
* PersonalTab
* PersonalAvatar
* PersonalCard
---
### Максим Иванов
#### Разработка компонентов и их функционал:
* PostsWrapper
* Post
* Avatar
* Modal
* ModalPost
* AddComments
* Comments
#### Разработка компонентов Redux и их функционал:
* Modal
* Users
* Posts



