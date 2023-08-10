<%-- 
    Document   : users
    Created on : Aug 6, 2023, 7:16:04 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="d-flex justify-content-between">
    <h3 class="">Quản lý user</h3>
    <button type="button" class="btn btn-dark">Thêm user
        <i class="bi bi-plus-lg"></i>
    </button>
</div>
<!--<form action="/users" class="col-xs-12 col-md-9 d-flex justify-content-end">
    <div class="form-outline me-2">
        <input type="text" name="kw" class="form-control h-100" placeholder="Nhập từ khóa" />
    </div>
    <input type="hidden" id="role" name="role" value="">

    <div class="form-check form-check-inline">
        <input class="form-check-input role-input" type="checkbox" onchange="onChangeRole(this)" value="ADMIN">
        <label class="form-check-label" for="inlineCheckbox1">admin</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input role-input" type="checkbox" onchange="onChangeRole(this)" value="TENANT">
        <label class="form-check-label" for="inlineCheckbox2">tenant</label>
    </div>
    <button type="submit" class="btn btn-dark">Tìm kiếm</button>
</form>-->
<table class="table align-middle mb-0 bg-white mt-3">
    <thead class="bg-light">
        <tr class="">
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <c:forEach items="${users}" var="u">
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div>
                            <img
                                src="${u.avatar}"
                                alt="avatar"
                                style="width: 45px; height:45px; object-fit: cover"
                                class="rounded-circle"
                                />
                        </div>

                        <div class="ms-3">
                            <p class="fw-bold mb-1">${u.fullName}</p>
                            <p class="text-muted mb-0">${u.username}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="fw-normal">${u.email}</p>
                </td>
                <td>
                    <p class="fw-normal">${u.createdAt}</p>
                </td>
                <td>
                    <c:choose>
                        <c:when test="${u.userRole == 'ADMIN'}">
                            <p><span class="badge rounded-pill text-bg-warning">${u.userRole}</span></p>

                        </c:when>
                        <c:when test="${u.userRole == 'LANDLORD'}">
                            <p><span class="badge rounded-pill text-bg-info">${u.userRole}</span></p>
                        </c:when>
                        <c:otherwise>
                            <p><span class="badge rounded-pill text-bg-dark">${u.userRole}</span></p>
                        </c:otherwise>    
                    </c:choose>

                </td>
                <td>
                    <button type="button" class="btn btn-link btn-sm btn-rounded">
                        Edit
                    </button>
                </td>
            </tr>
        </c:forEach>


    </tbody>
</table>
