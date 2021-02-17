<div class="alert alert-success" id="succMsg" role="alert" style="display: none">
    <p id="succMsgVal">${succMsg}</p>
</div>

<div class="alert alert-danger" id="errMsg" role="alert" style="display: none">
    <p id="errMsgVal">${errMsg}</p>
</div>

<div>
    <form action="/user/register" method="post" enctype="multipart/form-data" id="registerForm">
        <input type="text" name="name" autocomplete="off" id="registerNameInput" placeholder="Ime">
        <input type="text" name="surname" autocomplete="off" id="registerSurnameInput" placeholder="Priimek">
        <input type="text" name="email" autocomplete="off" id="registerEmailInput" placeholder="Email">
        <input type="password" name="password" autocomplete="off" id="registerPasswordInput" placeholder="Geslo">
        <button type="submit">Registracija</button>
    </form>
</div>
