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
                    <span>${birdInfoData.height}</span>
                </div>
                <div class="col-6">

                </div>
            </div>
        </div>
    </div>
</div>
