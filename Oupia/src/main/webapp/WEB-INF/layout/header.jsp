<%-- 
    Document   : header
    Created on : Aug 6, 2023, 1:43:39 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<c:url value="/" var="homeUrl"/>
<c:url value="/users/" var="usersUrl"/>
<c:url value="/motels/" var="motelsUrl"/>


<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100 px-3">
        <div class="container-fluid">
            <a class="navbar-brand col-1 d-flex align-items-center" href="${homeUrl}">
                <img src="<c:url value="/img/logoOupia.svg"/>" style="width: 45px; height:45px"/>
                <h3 class="mb-0 ms-2 text-my-primary fw-bold">Oupia</h3>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav ms-5 mb-lg-0 w-100">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="${homeUrl}">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-nowrap" href="${usersUrl}">Người dùng</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-nowrap" href="${motelsUrl}">Nhà trọ</a>
                    </li>
                </ul>
            </div>
            <sec:authorize access="isAnonymous()">
                <c:url value="/login/" var="loginUrl"/>
                <div class="ms-5 w-100 d-flex">
                    <a href="${loginUrl}" class="ms-auto btn btn-my-primary">Đăng nhập</a>
                </div>
            </sec:authorize>

            <sec:authorize access="isAuthenticated()">
                <div class="dropdown ms-5 w-100 d-flex">
                    <a
                        class="ms-auto dropdown-toggle d-flex align-items-center hidden-arrow text-decoration-none text-white"
                        href="#"
                        id="avatarMenu"
                        role="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        >
                        <img
                            id="adminAvatar"
                            src="<c:url value="/img/avatar.png"/>"
                            class="rounded-circle"
                            height="35"
                            alt="avatar"
                            loading="lazy"
                            />
                        <p class="ms-2"><sec:authentication property="name" /></p>
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-end p-4 border-0 shadow" style="width:250px"
                        aria-labelledby="avatarMenu"
                        >
                        <div class="d-flex justify-content-center align-items-center flex-column py-2 px-3 fw-bold">
                            <img
                                id="adminAvatar2"
                                src="<c:url value="/img/avatar.png"/>"
                                class="rounded-circle"
                                height="70"
                                width="70"
                                alt="avatar"
                                loading="lazy"
                                />
                            <p id="adminFullName" class="pt-3">Họ tên</p>
                        </div>
                        <li class="py-1 text-center">
                            <a class="dropdown-item" href="#">My profile</a>
                        </li>
                        <li class="py-1 text-center">
                            <a class="dropdown-item" href="#">Settings</a>
                        </li>
                        <li class="py-1 text-center">
                            <a class="dropdown-item" href="<c:url value='/logout' />">Logout</a>
                        </li>
                    </ul>
                </div>
            </sec:authorize>
        </div>
    </nav>
</nav>
<script>
    <sec:authorize access="isAuthenticated()">
    fetch('/api/users/authenticated-user/', {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 200)
            return res.json()
        else
            location.reload();
    }).then(data => {
        document.querySelector("#adminAvatar").src = data["avatar"];
        document.querySelector("#adminAvatar2").src = data["avatar"];

        document.querySelector("#adminFullName").innerText = data["fullName"];
    });
    </sec:authorize>
</script>
