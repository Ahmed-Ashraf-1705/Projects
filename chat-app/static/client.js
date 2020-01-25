$(()=>{
    var socket = io.connect();
    var $msgForm = $('.message-form');
    var $msg = $('#message');
    var $chat = $('.message-container');
    var $ufa = $('#userFormArea');
    var $chatArea = $('#chatArea');
    var $userForm = $('.user-form');
    var $users = $('#users');
    var $username = $('#username');

    $msgForm.submit((e)=>{
        e.preventDefault();

        // send message
        socket.emit('send-message', $msg.val(),(data)=>{
            $chat.append(`<div class='error'><strong>${data}</strong></div>`);
        });
        $msg.val('');
    });

    // append message to chat
    socket.on('new-message',(data)=>{
        $chat.append(`<div class='chat-msg'><strong>${data.user}</strong>: ${data.msg}</div>`);
    });

    // whisper -unicast-
    socket.on('whisper',(data)=>{
        $chat.append(`<div class='whisper'><strong>${data.user}</strong>: ${data.msg}</div>`);
    });

    // add new user
    $userForm.submit((e)=>{
        e.preventDefault();

        // add user
        socket.emit('new-user', $username.val(), (data)=>{
            if(data) {
                $ufa.hide();
                $chatArea.show();
            }
        });
        $username.val('');
    });

    // get users
    socket.on('get-users',(data)=>{
        var hc = '';
        for(let i = 0; i < data.length; i++){
            hc += `<li class='list-group-item'>${data[i]}</li>`;
        }
        $users.html(hc);
    });


});
