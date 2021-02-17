<div class="alert alert-success" id="succMsg" role="alert" style="display: none">
    <p id="succMsgVal">${succMsg}</p>
</div>

<div class="alert alert-danger" id="errMsg" role="alert" style="display: none">
    <p id="errMsgVal">${errMsg}</p>
</div>

<div>
    <form action="/user/login" method="post" enctype="multipart/form-data" id="loginForm">
        <input type="text" name="email" autocomplete="off" id="loginEmailInput" placeholder="Email">
        <input type="password" name="password" autocomplete="off" id="loginPasswordInput" placeholder="Geslo">
        <button type="submit">Prijava</button>
    </form>
</div>
