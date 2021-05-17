<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<div class="main-content">
    <div class="library-search-container">
        <div class="row">
            <input type="text" class="form-control library-search-input" id="librarySearchInput">
            <span class="search-field-text cursor-pointer">Išči</span>
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
        <div class="row">
            <button class="btn btn-outline-primary load-more-bird-results">Naloži več</button>
        </div>
    </div>
</div>
