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
    <link rel="stylesheet" href="../static/css/style_v1.css">
    <link rel="stylesheet" href="../static/css/style.css">
</head>
<body>

<header class="header" style="position: fixed; top:0;">
    <img class="logo" src="../static/img/tinder_logo.png" alt="tinder_logo">
    <nav class="nav-bar">
        <a class="grow" href="/app/users"><span>USER PROFILES</span></a>
        <a class="grow" href="/app/liked"><span>YOUR MATCHES</span></a>
        <a class="grow" href="/logout"><span>LOGOUT</span></a>
    </nav>
</header>

<#if nolikes == true >
    <div class="main-container">
        <h1 style="text-align: center">SO FAR THERE ARE NO MATCHES FOR YOU...</h1>
    </div>

<#else>
    <table class="table-users table" border="0">
        <form action="/app/messages" method="get" enctype="application/x-www-form-urlencoded">
            <#list profiles as profile>
                <tr>
                    <td width="10">
                        <div class="avatar-img">
                            <img class="img-circle" src="${profile.getPicUrlAvatar()}"/>
                        </div>
                    </td>
                    <td class="align-middle">
                        ${profile.getFirstName()} ${profile.getLastName()}
                    </td>
                    <td class="align-middle">
                        ${profile.getOccupation()}
                    </td>
                    <td class="align-middle">
                        Last Login: ${profile.showLastLoginTime()}<br>
                        <small class="text-muted">${profile.getLastLoginPeriod()}</small>
                    </td>
                    <td class="align-middle">
                        <button type="submit" name="user_whom_id"
                                value="${profile.getId()?string}"
                                class="btn btn-outline-primary">CHAT NOW
                        </button>
                    </td>
                </tr>
            </#list>
        </form>
    </table>
</#if>

</body>
</html>