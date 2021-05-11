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
        <c:forEach items="${birdList}" var="item">
            ${item.name}<br>
        </c:forEach>
    </div>
</div>
