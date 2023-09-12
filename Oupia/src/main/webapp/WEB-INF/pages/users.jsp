<%-- 
    Document   : users
    Created on : Aug 6, 2023, 7:16:04 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/" var="homeUrl"/>

<nav aria-label="breadcrumb mb-3">
    <ol class="breadcrumb border border-1 rounded-3 shadow-sm p-3">
        <li class="breadcrumb-item"><a href="${homeUrl}">Trang chủ</a></li>
            <c:choose>
                <c:when test="${params.isDeleted == '0'}">
                <li class="breadcrumb-item active" aria-current="page">Người dùng</li>
                </c:when>
                <c:otherwise>
                    <c:url value="/users" var="usersUrl"/>

                <li class="breadcrumb-item"><a href="${usersUrl}">Người dùng</a></li>
                <li class="breadcrumb-item active" aria-current="page">Thùng rác</li>

            </c:otherwise>
        </c:choose>
    </ol>
</nav>


<form class="mt-4">
    <div class="d-flex align-items-center">
        <c:choose>
            <c:when test="${params.isDeleted == '0'}">
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Quản lý user</h3>
                <c:url value="/users/storage/" var="url"/>
                <a href="${url}" type="button" class="btn text-white btn-my-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px">
                    <i class="d-flex align-items-center bi bi-plus display-6"></i>
                </a>
                <c:url value="/users/bin/" var="urlBin"/>

                <a href="${urlBin}" type="button" class="ms-auto btn text-white btn-my-primary d-flex align-items-center justify-content-center">
                    Thùng rác <i class="bi bi-trash ms-2"></i>
                </a>
            </c:when>
            <c:otherwise>
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">User không còn hoạt động</h3>

            </c:otherwise>
        </c:choose>


    </div>

    <div class="row align-items-center">
        <div class="col-12 col-md-4 mt-3">
            <input value="${params.kw}" id="kw" type="text" name="kw" class="form-control shadow-sm" placeholder="Nhập từ khóa" aria-label="Nhập từ khóa" aria-describedby="button-addon2">
        </div>
        <div class="col-12 col-md-2 mt-3">
            <button type="button" class="w-100 btn border shadow-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-badge text-my-primary"></i> Vai trò
            </button>
            <ul class="dropdown-menu p-3 border shadow-sm">
                <c:forEach items="${userRoles}" var="role">
                    <li>
                        <div class="form-check form-check-inline">
                            <c:set var="checked" value=""/>
                            <c:forEach items="${userRoleParams}" var="paramRole">
                                <c:if test="${paramRole eq role.toString()}">
                                    <c:set var="checked" value="checked"/>
                                </c:if>
                            </c:forEach>
                            <input class="form-check-input" type="checkbox" name="userRole" value="${role}" id="${role}" ${checked}>
                            <label class="form-check-label" for="${role}">${role.displayName}</label>
                        </div>

                    </li>
                </c:forEach>
                <div class="w-100">
                    <p class="cursor-hand" onclick="uncheckAllRole()">
                        <i class="bi bi-x-square-fill text-dark"></i>
                        Xóa bỏ
                    </p>
                </div>
            </ul>
        </div>

        <div class="col-12 col-md-2 mt-3">
            <button type="button" class="w-100 btn border shadow-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-shield-shaded text-my-primary"></i> Tình trạng
            </button>
            <ul class="dropdown-menu p-3 border-light-subtle shadow-sm">
                <c:forEach items="${status}" var="s">
                    <li>
                        <div class="form-check form-check-inline">
                            <c:set var="checked" value=""/>
                            <c:forEach items="${statusParams}" var="statusParam">
                                <c:if test="${statusParam eq s.toString()}">
                                    <c:set var="checked" value="checked"/>
                                </c:if>
                            </c:forEach>
                            <input class="form-check-input" type="checkbox" name="status" value="${s}" id="${s}" ${checked}>
                            <label class="form-check-label" for="${s}">${s.displayName}</label>
                        </div>

                    </li>

                </c:forEach>
                <div class="w-100">
                    <p class="cursor-hand" onclick="uncheckAllStatus()">
                        <i class="bi bi-x-square-fill text-dark"></i>
                        Xóa bỏ
                    </p>
                </div>
            </ul>
        </div>
        <div class="col-12 col-md-2 mt-3">
            <button type="button" class="w-100 btn border shadow-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-envelope-check text-my-primary"></i> Xác thực email
            </button>
            <ul class="dropdown-menu p-3 border-light-subtle shadow-sm">
                <c:set var="checkUnconfirm" value=""/>
                <c:set var="checkConfirm" value=""/>
                <c:choose>
                    <c:when test="${params.isConfirm == '1'}">
                        <c:set var="checkConfirm" value="checked"/>
                    </c:when>
                    <c:when test="${params.isConfirm == '0'}">
                        <c:set var="checkUnconfirm" value="checked"/>
                    </c:when>
                </c:choose>
                <li>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="isConfirm" value="0" id="unconfirmed" ${checkUnconfirm}>
                        <label class="form-check-label" for="unconfirmed">Chưa xác thực</label>
                    </div>
                </li>
                <li>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="isConfirm" value="1" id="confirmed" ${checkConfirm}>
                        <label class="form-check-label" for="confirmed" >Đã xác thực</label>
                    </div>
                </li>
                <div class="w-100">
                    <p class="cursor-hand" onclick="uncheckAllConfirm()">
                        <i class="bi bi-x-square-fill text-dark"></i>
                        Xóa bỏ
                    </p>
                </div>
            </ul>
        </div>
        <div class="col-12 col-md-2 mt-3">
            <button class="w-100 btn text-white btn-my-primary border shadow-sm" type="button" onclick="searchFilter()" id="button-addon2">Tìm kiếm</button>
        </div>

    </div>
    <c:if test="${not empty successMessage}">
        <div class="toast show align-items-center text-bg-success bg-opacity-25 border-1 border-success my-4" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body text-success">
                    ${successMessage}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </c:if>
    <c:choose>
        <c:when test="${empty users}">
            <div class="alert alert-primary bg-my-primary-25 border-my-primary mt-3" role="alert">
                Không tìm thấy người dùng.
            </div>
        </c:when>
        <c:otherwise>
            <table class="table align-middle mb-0 bg-white mt-3">
                <thead>
                    <tr class="">
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Đã xác thực</th>
                        <th>Vai trò</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <c:forEach items="${users}" var="u">
                        <tr>
                            <td>
                                <div class="d-flex align-items-center py-2">
                                    <div>
                                        <img
                                            src="${u.avatar}"
                                            alt="avatar"
                                            style="width: 80px; height:80px; object-fit: cover"
                                            class="rounded-circle me-3"
                                            />
                                    </div>

                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">${u.fullName}</p>
                                        <p class="text-muted mb-0">@${u.username}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="fw-normal">${u.email}</p>
                            </td>               
                            <td>
                                <c:choose>
                                    <c:when test="${u.isConfirm}">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input bg-my-primary border-my-primary" type="checkbox" role="switch" style="opacity: 1 !important" checked disabled>
                                        </div>
                                    </c:when>
                                    <c:otherwise>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" style="opacity: 1 !important" disabled/>
                                        </div>
                                    </c:otherwise>
                                </c:choose>   
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${u.userRole == 'ADMIN'}">
                                        <p><span class="badge rounded-pill text-dark bg-danger bg-opacity-25 border border-danger">${u.userRole}</span></p>

                                    </c:when>
                                    <c:when test="${u.userRole == 'TENANT'}">
                                        <p><span class="badge rounded-pill text-dark bg-my-primary-25 border border-my-primary">${u.userRole}</span></p>
                                        </c:when>
                                        <c:otherwise>
                                        <p><span class="badge rounded-pill text-dark bg-warning bg-opacity-25 border border-warning">${u.userRole}</span></p>
                                        </c:otherwise>    
                                    </c:choose>

                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${params.isDeleted == '1'}">
                                        <c:url value="/admin/users/bin/${u.username}/" var="api" />
                                        <a onclick="restoreUser('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Phục hồi">
                                            <i class="bi bi-arrow-clockwise text-my-primary"></i>
                                        </a>
                                        <a onclick="destroyUser('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa vĩnh viễn">
                                            <i class="bi bi-trash text-danger"></i>
                                        </a>
                                    </c:when>
                                    <c:otherwise>
                                        <c:url value="/users/storage/${u.username}/" var="editUrl"/>
                                        <a href="${editUrl}" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Chỉnh sửa">
                                            <i class="bi bi-pencil text-my-primary"></i>
                                        </a>
                                        <c:url value="/admin/users/${u.username}/" var="api" />

                                        <a onclick="delUser('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa">
                                            <i class="bi bi-eraser text-my-primary"></i>
                                        </a>
                                    </c:otherwise>
                                </c:choose>

                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>

        </c:otherwise>
    </c:choose>
    <input class="d-none" name="page" value="${params.page}" id="page"/>
    <c:if test="${pages > 1}">
        <nav aria-label="Page navigation">
            <ul class="pagination d-flex justify-content-center mt-4" >

                <c:forEach begin="1" end="${pages}" var="i" >
                    <c:set var="cssClass" value="text-dark"/>
                    <c:if test="${i == params.page}">
                        <c:set var="cssClass" value="bg-dark text-white"/>
                    </c:if>
                    <li class="page-item"><button class="page-link ${cssClass}" value="${i}" type="button" onclick="selectPage(this)">${i}</button></li>
                    </c:forEach>
            </ul>
        </nav>
    </c:if>
</form>
<script>
    function selectPage(obj) {
        let inputPage = document.querySelector("#page");
                let roleChecked = [<c:forEach items="${userRoleParams}" var="role" varStatus="vs">${vs.index > 0 ? ', ' : ''}'${role}'</c:forEach>];
                let statusChecked = [<c:forEach items="${statusParams}" var="s" varStatus="vs">${vs.index > 0 ? ', ' : ''}'${s}'</c:forEach>];

        let kw = "${empty params.kw ? '' : params.kw}";
        let confirm = "${empty params.kw ? '' : params.kw}";

        let userRoleInputs = document.querySelectorAll("input[name=userRole]");
        userRoleInputs.forEach(roleInput => {
            roleInput.checked = false;
            roleChecked.forEach(role => {
                if (roleInput.value == role) {
                    roleInput.checked = true;
                }
            })
        })

        let statusInputs = document.querySelectorAll("input[name=status]");
        statusInputs.forEach(statusInput => {
            statusInput.checked = false;
            statusChecked.forEach(s => {
                if (statusInput.value == s) {
                    statusInput.checked = true;
                }
            })
        })

        if (confirm) {
            if (confirm == '0')
                document.querySelector("#unconfirmed").checked = true;
            else if (confirm == '1')
                document.querySelector("#confirmed").checked = true;
        } else {
            document.querySelector("#unconfirmed").checked = false;
            document.querySelector("#confirmed").checked = false;
        }

        document.querySelector("#kw").value = kw;


        inputPage.setAttribute("value", obj.getAttribute("value"));
        document.querySelector("form").submit();
    }

    function searchFilter() {
        let inputPage = document.querySelector("#page").value = "1";
        document.querySelector("form").submit();

    }

    function uncheckAllRole() {
        let userRoleInputs = document.querySelectorAll("input[name=userRole]");
        userRoleInputs.forEach(input => input.checked = false);
    }
    function uncheckAllConfirm() {
        let confirmInputs = document.querySelectorAll("input[name=isConfirm]");
        confirmInputs.forEach(input => input.checked = false);
    }

    function uncheckAllStatus() {
        let statusInputs = document.querySelectorAll("input[name=status]");
        statusInputs.forEach(input => input.checked = false);
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
</script>

<script src="<c:url value="/js/users.js"/>"></script>
