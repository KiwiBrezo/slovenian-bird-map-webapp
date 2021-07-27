<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../template/leftMenu.jsp" />

<div class="main-content">
    <div class="main-user-info-container" data-userid="${userID}">
        <div class="name-section">
            <h1>${userBasicData.name} ${userBasicData.surname}</h1>
        </div>

        <div class="analytic-data-section">
            <div class="row">
                <div class="col-4">
                    <div class="numbers-observation-section">
                        <div class="my-2">
                            <h5>Stevilo vseh opazovanj:</h5>
                            <input type="number" disabled value="0" id="AllObservations" class="form-control">
                        </div>

                        <div class="my-2">
                            <h5>Stevilo opazovanj tega leta:</h5>
                            <input type="number" disabled value="0" id="YearObservations" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="col-8">

                </div>
            </div>
        </div>

        <div class="row user-map-link">
            <div class="link-container">
                <a href="/map/user/${userID}">
                    <i class="fas fa-globe-europe"></i>
                    Opazovanja uporabnika
                </a>
            </div>
        </div>
    </div>



    <c:if test="${userEnableSettings}" >
        <div class="settings-section">
            <h3>Nastavitve</h3>

            <div class="change-passw-section">
                <h5>Spremeni geslo</h5>
                <div class="row">
                    <div class="col-6">
                        <input type="password" id="ChangePasswdOrig" class="form-control" placeholder="Novo geslo">
                    </div>
                    <div class="col-6">
                        <input type="password" id="ChangePasswdRepeat" class="form-control" placeholder="Ponovi novo geslo">
                    </div>
                </div>
                <button class="btn btn-success" id="ChangePasswdBtn">Posodobi</button>
            </div>

            <div class="reset-observations-section">
                <div class="row">
                    <div class="col-6">
                        <h5>Ponastavi opazovanja</h5>
                        <p>S tem boste izbrisali vsa opazovanja tega uporabika!</p>
                    </div>
                    <div class="col-4">
                        <input type="password" id="ResetObservationPassw" class="form-control" placeholder="Vnesite geslo">
                    </div>
                    <div class="col-2">
                        <button class="btn btn-success float-right" id="ResetObservationBtn" onclick="UserController.deleteUsersObservation()">Izbrisi</button>
                    </div>
                </div>
            </div>
        </div>
    </c:if>
</div>

<div id="typeOfController" data-controller="User,LeftMenu"></div>
