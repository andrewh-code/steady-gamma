// global
const baseUrl = "http://localhost:1234";
var jwtToken;
function helloWorld(){
    window.alert("hello world");
}

/**
 * register button
 * 
 */

 $(document).ready(function(){
     $('#Register').click(function(){
        var endpointRegister = baseUrl + "/users/register";

        var newUserName = document.getElementById('newusername').value;
        var newPassword = document.getElementById('newpassword').value;

        var newUserBody = {
            "newUsername": newUserName,
            "newPassword": newPassword
        };

        var request = $.ajax({
            type: 'POST',
            url: endpointRegister,
            data: newUserBody,
            dataType: 'JSON'
        });
        request.done(function(response){
            // close bootstrap modal after success
            $('#registerModal').modal('hide');
            var registerSuccessMsg = "user created, please log in";
            $('#registerSuccess').html(registerSuccessMsg);
        });
        request.fail(function(response){
            var code = response.status;
            var msg = response.responseJSON.errorMsg;
            console.log(code + ": " + msg);
            $("#registerError").html(msg);
        });
     });
 })
/**
 * log in button
 */
$(document).ready(function(){
    $('#logIn').click(function(){
        var endpointLogin = baseUrl + "/users/login";
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var body = {
            "username": username,
            "password": password
        };
        // $.post(endpoint, body, function(serverResponse){
        //     // var result = jQuery.parseJSON(serverResponse);
        //     console.log("response code is: " + result);
        // }, "json").error(function(){
        //     console.log("error");
        // });
        var request = $.ajax({
            type: 'POST',
            url: endpointLogin,
            data: body,
            dataType: 'JSON'
        });
        // 200
        request.done(function(response){
            console.log(response);
            //     // store the jwt token in an http cookie
            jwtToken = response.jwtToken;
            document.cookie = "andrewcookie="+jwtToken+";";
            var endpointWelcome = baseUrl + "/welcome";
            // execute another AJAX request instead of redirect.
            // have a CROS error here....doesn't make sense
            $.ajax({
                type: 'GET',
                url: endpointWelcome,
                headers: {"Authorization": jwtToken},
                success: function(){
                    // $(location).attr('href', endpointWelcome);
                }
            });

        });
        request.fail(function(response){
            var code = response.status;
            var msg = response.responseJSON.errorMsg;
            console.log(code + msg);
            $("#loginError").html(msg);
        });
        
    });
});


/**
 * access protected route...
 * cannot figure out how to redirect with the token bearer properly (either through cookies or headers)...wtf
 * 
 */

$(document).ready(function() {
    $('#protectedRoute').click(function() {
        var endpointWelcome = baseUrl + "/welcome";

        // execute GET requeset
        jwtToken = "1234";
        var bearerHeader = "Bearer " + jwtToken;
        var request = $.ajax({
            type: 'GET',
            url: endpointWelcome,
            headers: {
                'Authorization': bearerHeader,
            },
        });
        request.done(function(response){
            console.log("success");
            console.log(response);
            $(location).attr('href', endpointWelcome);
        });
        request.fail(function(response) {
            console.log("failed");
            console.log(response);
        });
    });
});