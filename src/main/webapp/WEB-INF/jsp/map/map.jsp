<%@ page contentType="text/html; charset=UTF-8" %>

<div id="map" class="map"></div>

<div class="location-selector-container">
    <select class="form-select location-selector-select">
        <option value="-1">Izberi območje za prikaz</option>
    </select>
</div>

<div class="scale-container">
    <div class="row coordinate-text">
        <span>[</span>
        <div id="mouse-position"></div>
        <span>]</span>
    </div>
</div>

<div class="user-container" data-userID="${userID}">
    <div class="user-container-header">
        <span>${userName}</span>
        <span class="float-right">
            <i class="fas fa-caret-down cursor-pointer user-menu-btn"></i>
        </span>
    </div>
    <div class="user-container-body">
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="/user/dashboard/${userID}">Profil</a></span>
        </div>
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="/bird/">Knjižnjica ptic</a></span>
        </div>
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="/user/logout">Odjava</a></span>
        </div>
    </div>
</div>

<div class="tool-btn-container activate cursor-pointer">
    <i class="fas fa-tools"></i>
</div>

<div class="heatmap-btn-container cursor-pointer">
    <i class="fas fa-layer-group"></i>
</div>

<div class="search-field-container">
    <div class="input-group main-search">
        <input type="text" class="form-control" id="search-observation-input" placeholder="Slo. ali lat. ime ptice" aria-label="Slo. ali lat. ime ptice">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" onclick="SearchComponent.searchObservations()"><i class="fas fa-lg fa-search cursor-pointer"></i></button>
        </div>
    </div>
</div>

<div class="search-result-container">
    <div class="container-header">
        <span>Rezultat iskanja:</span>
        <span class="float-right">
            <i class="fas fa-times cursor-pointer" onclick="MapComponent.closeSearchResults()"></i>
        </span>
    </div>
    <div class="container-body">

    </div>
</div>

<div class="observation-info-container" style="display: none">
    <div class="container-header">
        <span>Podrobnosti opazovanja:</span>
        <span class="float-right drag-handle">
            <i class="fas fa-arrows-alt cursor-pointer"></i>
            <i class="fas fa-times cursor-pointer" onclick="MapComponent.closeObservationInfo()"></i>
        </span>
    </div>
    <div class="container-body">
        <h3 class="bird-name-title" id="birdNormalName"></h3>
        <div class="row" style="margin-bottom: 4px">
            <span class="col-7 cursor-pointer" id="userData"></span>
            <span class="number-container" id="col"></span>
        </div>
        <div class="row" style="margin-bottom: 7px">
            <span class="col-7 date-observation-conatiner" id="dateOfObservation"></span>
            <button id="zoomToBtn" class="btn btn-success btn-zoom-to-location"><i class="fas fa-map-marked-alt"></i></button>
        </div>
        <div class="row observation-comment-container">
            <p class="col-12">Komentar:</p>
            <div class="col-12">
                <h6 id="comment"></h6>
            </div>
        </div>
    </div>
</div>

<div class="notification-container" style="display: none">
    <div class="container-header">
        <i class="fas fa-exclamation-circle"></i>
        <span>Obvestilo:</span>
    </div>
    <div class="container-body">

    </div>
</div>

<div class="tool-container">
    <div class="container-header">
        <span>Orodja:</span>
        <span class="float-right drag-handle">
            <i class="fas fa-arrows-alt cursor-pointer"></i>
        </span>
    </div>
    <div class="container-body">
        <div class="add-observation-container mx-0 w-100">
            <span class="row mx-0 mb-2 title-text">Dodaj opazovanje:</span>
            <select name="bird" id="bird-select-new-observation" class="form-select w-100 my-1">
                <option value="-1" selected>Izberi opazovano ptico</option>
            </select>
            <div class="row mx-0 my-1">
                <input type="text" class="form-control col-8" id="new-observation-comment" placeholder="Komentar...">
                <input type="number" class="form-control" id="observation-number" value="1" placeholder="Kol.">
            </div>
            <div class="row mx-0">
                <input class="form-control col-8" type="date" id="new-observation-date">
                <button class="btn btn-outline-success" id="add-observation-location-selector" onclick="NewObservationComponent.toggleLocationSelector()"><i class="fas fa-map-marker-alt"></i></button>
            </div>
            <button class="btn btn-primary w-100 mt-2" onclick="NewObservationComponent.addNewObservation()">Dodaj</button>
        </div>

        <div class="analiyze-data-container mx-0">
            <span class="row mx-0 title-text">Analiziranje opazovanj:</span>
            <div class="row mx-0 my-2">
                <input class="form-control col-6" type="date" id="analyzeFromDate">
                <input class="form-control" type="date" id="analyzeToDate">
            </div>
            <div class="row mx-0 seasons-btn-container my-2">
                <button class="btn btn-outline-secondary season-btn" id="springSeasonBtn"><i class="fas fa-seedling"></i></button>
                <button class="btn btn-outline-secondary season-btn" id="summerSeasonBtn"><i class="fas fa-sun"></i></button>
                <button class="btn btn-outline-secondary season-btn" id="autumnSeasonBtn"><i class="fas fa-cloud-showers-heavy"></i></button>
                <button class="btn btn-outline-secondary season-btn" id="winterSeasonBtn"><i class="far fa-snowflake"></i></button>
            </div>
            <div class="row mx-0 my-2">
                <button class="btn btn-outline-secondary circle-selector-btn draw-location-btn" onclick="MapComponent.activateAndSetDrawingOnMap('Circle')"><i class="fas fa-street-view"></i></button>
                <button class="btn btn-outline-secondary poligon-selector-btn draw-location-btn" onclick="MapComponent.activateAndSetDrawingOnMap('Polygon')"><i class="fas fa-draw-polygon"></i></button>
            </div>
            <select name="area" id="area-select" class="form-select w-100">
                <option value="-1" selected>Izberi območje</option>
            </select>
            <div class="row mx-0 btm-container mt-4">
                <button class="btn btn-outline-primary" onclick="AnalyzerComponent.resetAnalyzeFilter()">Ponastvai</button>
                <button class="btn btn-outline-success" onclick="AnalyzerComponent.useAnalyzeFilter()">Uporabi</button>
            </div>
        </div>
    </div>
</div>

<div class="result-window"></div>

<div id="defaultCqlFilter" data-cql="${defaultCqlFilter}"></div>

<div id="geoserverData" data-wms="${geoserverWms}" data-wfs="${geoserverWfs}"></div>

<div id="typeOfController" data-controller="Map"></div>
