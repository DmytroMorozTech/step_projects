<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="static/img/logo_ultra_small.png">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <title>Chat with ${userWhomFullName}</title>

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
        <#--        <a class="grow" href="/app/messages?user_whom_id=${userWhomId}" id="refresh"><span>REFRESH CHAT DATA</span></a>-->
        <a class="grow" href="/app/users"><span>USER PROFILES</span></a>
        <a class="grow" href="/app/liked"><span>YOUR MATCHES</span></a>
        <a class="grow" href="/logout"><span>LOGOUT</span></a>
    </nav>
</header>

<#--<#if noMessages == true >-->
<#--    <div class="nothing-found-container">-->
<#--        <h1 style="text-align: center">SO FAR THERE ARE NO MATCHES FOR YOU...</h1>-->
<#--    </div>-->

<#--<#else>-->
<div class=main-container>
    <div>
        <div class="messages-container">
            <table style="width: 100%">
                <col style="width: 50px; text-align: center"/>
                <col style="width: 40%;"/>
                <col style="width: 40%;"/>
                <col style="width: 50px; text-align: center"/>
                <#if noMessages == true>
                    <tr class="active-user-message">
                        <td></td>
                        <td></td>
                        <td>Now you may send the first message in this chat.</td>
                        <td><img class="img-circle-chat" src="../static/img/logo_ultra_small.png"/></td>
                    </tr>

                <#else>
                    <#list messages as msg>

                        <#if msg.getUserWhoId() == userWhoId>
                            <tr class="active-user-message">
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="message-block">
                                        <p class="message">${msg.getText()}</p>
                                        <p class="message-date-time">${msg.getSentAtTimeFormatted()}</p>
                                    </div>
                                </td>
                                <td><img class="img-circle-chat" src="${userWhoAvatarUrl}"/></td>
                            </tr>
                        <#else>
                            <tr class="passive-user-message">
                                <td><img class="img-circle-chat" src="${userWhomAvatarUrl}"/></td>
                                <td>
                                    <div class="message-block">
                                        <p class="message">${msg.getText()}</p>
                                        <p class="message-date-time">${msg.getSentAtTimeFormatted()}</p>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </#if>
                    </#list>
                </#if>
            </table>
        </div>

        <form class="send-msg-form" method="post">
            <input id="messageInput" type="text" name="message" class="typedMessage" placeholder="Type Your Message..."
                   autofocus>
            <button id="submit-msg-btn" data-user-whom-id="${userWhomId?string}" class="btn btn-outline-success btn-lg"
                    type="submit">Send
            </button>
        </form>
    </div>


</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="../static/js/script.js"></script>
</body>
</html>