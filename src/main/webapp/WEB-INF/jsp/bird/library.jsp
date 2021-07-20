<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<jsp:include page="../template/leftMenu.jsp" />

<div class="main-content">
    <div class="library-search-container">
        <div class="row">
            <input type="text" class="form-control library-search-input" id="librarySearchInput" placeholder="Slo. ali lat. ime ptice">
            <span class="search-field-text cursor-pointer" onclick="BirdSearchComponent.searchBirds()">Išči</span>
        </div>
    </div>
    <div class="search-results-container">
        <c:forEach items="${birdList}" var="bird">
            <div class="bird-result-container">
                <div class="row">
                    <div class="col-8 bird-name-field">
                        <a href="/bird/${bird.birdID}" class="bird-name">${bird.name}</a>
                        <br>
                        <span>${bird.nameLat}</span>
                    </div>
                    <div class="col-4 bird-photo-field">
                        <img src="${bird.imageLink}" alt="Ni fotografije...">
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
    <div class="row">
        <button class="btn btn-outline-primary load-more-bird-results" onclick="BirdSearchComponent.loadMoreResults()">Naloži več</button>
    </div>
</div>

<div id="typeOfController" data-controller="BirdSearch,LeftMenu"></div>
