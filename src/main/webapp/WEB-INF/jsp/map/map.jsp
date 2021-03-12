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

<div class="user-container">
    <div class="user-container-header">
        <span>Ime usera</span>
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

<div class="search-field-container">
    <div class="input-group main-search">
        <input type="text" class="form-control" placeholder="Slo. ali lat. ime ptice" aria-label="Slo. ali lat. ime ptice">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"><i class="fas fa-lg fa-search cursor-pointer"></i></button>
        </div>
    </div>
</div>

<div class="search-result-container d-none">
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

    </div>
</div>

<div class="result-window"></div>
