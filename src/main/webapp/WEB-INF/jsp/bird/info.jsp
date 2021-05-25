<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div class="main-content">
    <div class="main-bird-info-container">
        <div class="row main-bird-info">
            <div class="col-7">
                <h1>${birdData.name}</h1>
                <h4>Latinsko ime: ${birdData.nameLat}</h4>
            </div>
            <div class="col-5">
                <img src="${bird.imageLink}" alt="Ni fotografije...">
            </div>
        </div>

        <div class="row bird-map-link">
            <div class="link-container">
                <a href="/map/bird/${birdData.birdID}">
                    <i class="fas fa-globe-europe"></i>
                    Poglej na zemljevidu
                </a>
            </div>
        </div>

        <div class="secondary-bird-info">
            <div class="row">
                <div class="col-6 bird-data">
                    <c:if test="${not empty birdInfoData.height}" >
                        <div class="data-row row">
                            <span class="float-left key-data col-9 px-0">
                                <i class="fas fa-chevron-right"></i>
                                Visina ptice: </span>
                            <span class="float-right value-data col-3 px-0">${birdInfoData.height}</span>
                        </div>
                    </c:if>

                    <c:if test="${not empty birdInfoData.width}" >
                        <div class="data-row row">
                            <span class="float-left key-data col-9 px-0">
                                <i class="fas fa-chevron-right"></i>
                                Razpon kril ptice: </span>
                            <span class="float-right value-data col-3 px-0">${birdInfoData.width}</span>
                        </div>
                    </c:if>

                    <c:if test="${not empty birdInfoData.weight}" >
                        <div class="data-row row">
                            <span class="float-left key-data col-9 px-0">
                                <i class="fas fa-chevron-right"></i>
                                Teza ptice: </span>
                            <span class="float-right value-data col-3 px-0">${birdInfoData.weight}</span>
                        </div>
                    </c:if>

                    <c:if test="${not empty birdInfoData.eating}" >
                        <div class="data-row row">
                            <span class="float-left key-data col-9 px-0">
                                <i class="fas fa-chevron-right"></i>
                                Nacin prehranjevanja: </span>
                            <span class="float-right value-data col-3 px-0">${birdInfoData.eating}</span>
                        </div>
                    </c:if>
                </div>
                <div class="col-6">

                </div>
            </div>
        </div>
    </div>
</div>
