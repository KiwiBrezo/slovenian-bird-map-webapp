<%@ page contentType="text/html; charset=UTF-8" %>

<div class="main-content">
    <div class="row">
        <div class="col-7">
            <h1>${birdData.name}</h1>
            <h4>${birdData.nameLat}</h4>
        </div>
        <div class="col-5">
            <img src="${bird.imageLink}" alt="Ni fotografije...">
        </div>
    </div>

    <div class="row">
        <a href="/map/bird/${birdData.birdID}">Povezava do grafike</a>
    </div>

    <div class="row">
        <div class="col-6">

        </div>
        <div class="col-6">

        </div>
    </div>
</div>
