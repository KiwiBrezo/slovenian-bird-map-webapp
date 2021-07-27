<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../template/leftMenu.jsp" />

<div class="main-content">
    <div class="main-bird-info-container">
        <h1>${userBasicData.name} ${userBasicData.surname}</h1>
    </div>
    <c:if test="${userEnableSettings}" >
        <p>Nastavitve</p>
    </c:if>
</div>

<div id="typeOfController" data-controller="User,LeftMenu"></div>
