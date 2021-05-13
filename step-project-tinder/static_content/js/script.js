$("button").click((evt) => {
    evt.preventDefault();
    let msgInput = $("#messageInput");
    let inputVal = msgInput.val();

    let userWhomId = $("#submit-msg-btn").attr('data-user-whom-id');

    if (inputVal !== "") {
        $.post("../app/messages", {
            messageText: inputVal,
            userWhomId: userWhomId
        })

        setTimeout(() => {
            let href = window.location.href;
            msgInput.val(""); // we clear the input field
            $(location).attr('href', href);
        }, 200);
    } else {
        alert("Please enter some text for you message.")
    }


})