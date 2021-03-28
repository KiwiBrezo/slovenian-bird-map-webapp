<%@ page contentType="text/html; charset=UTF-8" %>

<div id="map" class="map"></div>

<div class="location-selector-container">
    <select class="form-select location-selector-select">
        <option selected>Slovenija</option>
        <option value="1">Ormoške lagune</option>
        <option value="2">Škocjanski zatok</option>
        <option value="3">Ljubljansko barje</option>
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
            <span class="cursor-pointer"><a href="#">Profil</a></span>
        </div>
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="#">Knjižnjica ptic</a></span>
        </div>
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="#">Nastavitve</a></span>
        </div>
        <div class="row mx-1">
            <span class="cursor-pointer"><a href="/user/logout">Odjava</a></span>
        </div>
    </div>
</div>

<div class="tool-btn-container activate cursor-pointer">
    <i class="fas fa-tools"></i>
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
                <input class="form-control col-6" type="date">
                <input class="form-control col-6" type="date">
            </div>
            <div class="row mx-0 seasons-btn-container my-2">
                <button class="btn btn-outline-secondary"><i class="fas fa-seedling"></i></button>
                <button class="btn btn-outline-secondary"><i class="fas fa-sun"></i></button>
                <button class="btn btn-outline-secondary"><i class="fas fa-cloud-showers-heavy"></i></button>
                <button class="btn btn-outline-secondary"><i class="far fa-snowflake"></i></button>
            </div>
            <div class="row mx-0 my-2">
                <div class="col-7 px-0 mr-2 point-selector-container">
                    <button class="btn btn-outline-secondary"><i class="fas fa-street-view"></i></button>
                    <div class="input-group">
                        <input type="number" class="form-control" value="1">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">KM</span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline-secondary" id="poligon-selector-btn"><i class="fas fa-draw-polygon"></i></button>
            </div>
            <select name="area" id="area-select" class="form-select w-100">
                <option value="-1" selected>Izberi območje</option>
            </select>
            <div class="row mx-0 btm-container mt-4">
                <button class="btn btn-outline-primary" onclick="MapComponent.removeTestLayer()">Ponastvai</button>
                <button class="btn btn-outline-success" onclick="MapComponent.addTestLayer()">Uporabi</button>
            </div>
        </div>
    </div>
</div>

<div class="result-window"></div>
