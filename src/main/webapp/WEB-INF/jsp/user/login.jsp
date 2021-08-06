<div class="container-fluid">
    <div class="login-container">
        <div class="alert alert-success" id="succMsg" role="alert" style="display: none">
            <p id="succMsgVal">${succMsg}</p>
        </div>

        <div class="alert alert-danger" id="errMsg" role="alert" style="display: none">
            <p id="errMsgVal">${errMsg}</p>
        </div>

        <div class="login-form-container">
            <div class="login-logo my-5">
                <img src="/icons/SlovenianBirdMapLogo.png" alt="Ni logo" width="100" height="100">
            </div>
            <form action="/user/login" method="post" enctype="multipart/form-data" id="loginForm">
                <div class="row mx-5 my-3">
                    <input type="email" class="form-control" name="email" autocomplete="off" id="loginEmailInput" placeholder="Email">
                </div>
                <div class="row mx-5 my-3">
                    <input type="password" class="form-control" name="password" autocomplete="off" id="loginPasswordInput" placeholder="Geslo">
                </div>
                <div class="row my-4">
                    <button class="btn btn-success login-btn" type="submit">Prijava</button>
                </div>
            </form>
            <div class="row my-4 mx-5 text-center">
                <span class="w-100">
                    <a href="/user/register">
                        Registriraj se
                    </a>
                </span>
            </div>
        </div>
    </div>
</div>

<div id="typeOfController" data-controller="User"></div>
