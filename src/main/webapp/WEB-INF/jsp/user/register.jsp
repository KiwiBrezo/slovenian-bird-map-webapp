<div class="container-fluid">
    <div class="register-conatiner">
        <div class="alert alert-success" id="succMsg" role="alert" style="display: none">
            <p id="succMsgVal">${succMsg}</p>
        </div>

        <div class="alert alert-danger" id="errMsg" role="alert" style="display: none">
            <p id="errMsgVal">${errMsg}</p>
        </div>

        <div class="register-form-container">
            <div class="row row mx-4 mb-5 mt-3">
                <span>Registracija novega uporabnika:</span>
            </div>
            <form action="/user/register" method="post" enctype="multipart/form-data" id="registerForm">
                <div class="row mx-5 my-3">
                    <input type="text" class="form-control" name="name" autocomplete="off" id="registerNameInput" placeholder="Ime">
                </div>
                <div class="row mx-5 my-3">
                    <input type="text" class="form-control" name="surname" autocomplete="off" id="registerSurnameInput" placeholder="Priimek">
                </div>
                <div class="row mx-5 my-3">
                    <input type="email" class="form-control" name="email" autocomplete="off" id="registerEmailInput" placeholder="Email">
                </div>
                <div class="row mx-5 my-3">
                    <input type="password" class="form-control" name="password" autocomplete="off" id="registerPasswordInput" placeholder="Geslo">
                </div>
                <div class="row my-4">
                    <button class="btn btn-success register-btn" type="submit">Registracija</button>
                </div>
            </form>
            <div class="row my-4 mx-5 text-center">
                <span class="w-100">
                    <a href="/user/login">
                        Sem uporabnik
                    </a>
                </span>
            </div>
        </div>

    </div>
</div>

<div id="typeOfController" data-controller="User"></div>