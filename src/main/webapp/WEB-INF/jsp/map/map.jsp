<div id="map" class="map"></div>

<div class="location-selector-container">

</div>

<div class="scale-container">
    <div class="row coordinate-text">
        <span>[</span>
        <div id="mouse-position"></div>
        <span>]</span>
    </div>
</div>

<div class="user-container">
    <span>Ime usera</span>
    <span class="float-right">
        <i class="fas fa-caret-down cursor-pointer"></i>
    </span>
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
        <span class="float-right">
            <i class="fas fa-arrows-alt cursor-pointer"></i>
        </span>
    </div>
    <div class="container-body">

    </div>
</div>

<div class="result-window"></div>
