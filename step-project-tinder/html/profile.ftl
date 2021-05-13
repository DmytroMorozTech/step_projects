<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="static/img/logo_ultra_small.png">

    <#-- Montserrat font upload  -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,500;0,700;1,200;1,300;1,400&display=swap" rel="stylesheet">

    <#-- Fontawesome for icons  -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <!-- Bootstrap core CSS -->
    <link href="../static/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="../static/css/style.css">
</head>
<body>

<header class="header">
    <img class="logo" src="../static/img/tinder_logo.png" alt="tinder_logo">
    <nav class="nav-bar">
        <a class="grow" href="/app/users"><span>USER PROFILES</span></a>
        <a class="grow" href="/app/liked"><span>YOUR MATCHES</span></a>
        <a class="grow" href="/logout"><span>LOGOUT</span></a>
    </nav>
</header>

<div class="profile-container">
    <div class="profile-card">
        <img class="profile-img" src="${profiles.getPicAddress()}"
             alt="${profiles.getFirstName()} ${profiles.getLastName()}">
        <p class="profile-name">${profiles.getFirstName()} ${profiles.getLastName()}</p>
        <form method="post" id="buttons-container">
            <button type="submit" name="like" value="-1" class="btn btn-outline-danger btn-lg">
                <span class="fa fa-times"></span>
                Dislike
            </button>
            <button type="submit" name="like" value="1" class="btn btn-outline-success btn-lg ">
                <span class="fa fa-heart"></span>
                Like
            </button>
        </form>
    </div>
</div>
</body>
</html>