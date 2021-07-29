<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<jsp:include page="../template/leftMenu.jsp" />

<div class="main-content">
    <div class="main-bird-info-container" data-birdid="${birdData.birdID}">
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
                <div class="col-6">
                    <div class="bird-data">
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

                    <c:if test="${not empty birdInfoData.description}" >
                        <div class="description-row row">
                            <p>Opis:</p>
                            <span>${birdInfoData.description}</span>
                        </div>
                    </c:if>
                </div>
                <div class="col-6">
                    <div class="numbers-observation-section">
                        <div class="mb-4">
                            <h5>Stevilo opazenih osebkov:</h5>
                            <input type="number" disabled value="0" id="NumberOfObservedType" class="form-control">
                        </div>

                        <div class="mt-2">
                            <h5>Stevilo opazovalcev te ptice:</h5>
                            <input type="number" disabled value="0" id="NumberOfObservers" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="analytic-data-section">
            <div class="row my-5">
                <div class="season-observation-section observation-graph">
                    <canvas id="SeasonObservationsBird" class="season-observation-graph" width="400px" height="400px"></canvas>
                </div>
            </div>

            <div class="row my-5">
                <div class="monthly-observation-section observation-graph">
                    <canvas id="MonthlyObservationsBird" class="monthly-observation-graph observation-graph" width="800px" height="400px"></canvas>
                </div>
            </div>

            <div class="row my-5">
                <div class="yearly-observation-section observation-graph">
                    <canvas id="YearlyObservationsBird" class="yearly-observation-graph observation-graph" width="800px" height="400px"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="typeOfController" data-controller="BirdInfo,LeftMenu"></div>
