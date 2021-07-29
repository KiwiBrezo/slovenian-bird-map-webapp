<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="left-menu-content" id="LeftMenu" style="display: none" data-userid="${userIdLeftMenu}">
    <div class="logo-container">
        <img src="/icons/SlovenianBirdMapLogo.png" alt="Ni logo" width="65" height="65">
    </div>

    <c:if test="${userRoleInfo!=null}" >
        <div class="buttons-container">
            <span class="left-menu-btn map-button cursor-pointer" id="MapButton">
                <i class="far fa-map"></i>
                <span class="btn-tooltip">Zemljevid</span>
            </span>
            <br>

            <span class="left-menu-btn library-button cursor-pointer" id="LibraryButton">
                <i class="fas fa-book"></i>
                <span class="btn-tooltip">Knijžnica</span>
            </span>
            <br>

            <span class="left-menu-btn profile-button cursor-pointer" id="ProfileButton">
                <i class="far fa-user-circle"></i>
                <span class="btn-tooltip">Profil</span>
            </span>
            <br>
        </div>
    </c:if>

    <div class="navigation-buttons">
        <c:if test="${userRoleInfo.equals('admin')}" >
            <span class="left-menu-btn admin-button cursor-pointer" id="AdminButton">
                <i class="fas fa-users-cog"></i>
                <span class="btn-tooltip">Admin</span>
            </span>
            <br>
        </c:if>

        <c:if test="${userRoleInfo.equals('user') || userRoleInfo.equals('admin')}" >
            <span class="left-menu-btn logout-button cursor-pointer" id="LogoutButton">
                <i class="fas fa-sign-out-alt"></i>
                <span class="btn-tooltip">Odjava</span>
            </span>
            <br>
        </c:if>

        <c:if test="${userRoleInfo==null}" >
            <span class="left-menu-btn login-button cursor-pointer" id="LoginButton">
                <i class="fas fa-sign-in-alt"></i>
                <span class="btn-tooltip">Prijava</span>
            </span>
            <br>
        </c:if>

        <span class="left-menu-btn expand-button cursor-pointer" id="ExpendButton">
            <i class="fas fa-chevron-right"></i>
        </span>
    </div>
</div>
