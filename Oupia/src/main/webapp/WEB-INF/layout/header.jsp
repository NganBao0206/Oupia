<%-- 
    Document   : header
    Created on : Aug 6, 2023, 1:43:39 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:url value="/" var="homeUrl"/>
    <c:url value="/users" var="usersUrl"/>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div class="container-fluid">
                <a class="navbar-brand col-1 d-flex align-items-center" href="${homeUrl}">
                    <img src="<c:url value="/img/logoOupia.svg"/>" style="width: 45px; height:45px"/>
                    <h3 class="mb-0 ms-2 text-my-primary fw-bold">Oupia</h3>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav ms-5 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="${homeUrl}">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${usersUrl}">User</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </nav

