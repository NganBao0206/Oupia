<%-- 
    Document   : users
    Created on : Aug 6, 2023, 7:16:04 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<form>
    <div class="d-flex justify-content-between">
        <h3 class="">Quản lý user</h3>
        <c:url value="/users/storage/" var="url"/>
        <a href="${url}" type="button" class="btn btn-dark p-2">Thêm user
            <i class="bi bi-plus-lg"></i>
        </a>
    </div>
    <table class="table align-middle mb-0 bg-white mt-3">
        <thead class="bg-light">
            <tr class="">
                <th>Tên</th>
                <th>Email</th>
                <th>Hiệu lực</th>
                <th>Đã xác thực</th>
                <th>Vai trò</th>
                <th></th>
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
                        <c:choose>
                            <c:when test="${u.isActive}">
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
                                <p><span class="badge rounded-pill text-dark bg-my-primary bg-opacity-25 border border-my-primary">${u.userRole}</span></p>
                                </c:when>
                                <c:otherwise>
                                <p><span class="badge rounded-pill text-dark bg-warning bg-opacity-25 border border-warning">${u.userRole}</span></p>
                                </c:otherwise>    
                            </c:choose>

                    </td>
                    <td>
                        <a type="button" class="btn btn-lg">
                            <i class="bi bi-pencil text-my-primary"></i>
                        </a>
                        <a type="button" class="btn btn-lg">
                            <i class="bi bi-eraser text-my-primary"></i>
                        </a>
                    </td>
                </tr>
            </c:forEach>



        </tbody>
    </table>
    <%--<c:if test="${pages > 1}">--%>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <c:forEach begin="1" end="${pages}" var="i" >
                    <li class="page-item"><button class="page-link" name="page" value="${i}" type="submit">${i}</button></li>
                </c:forEach>
            </ul>
        </nav>
    <%--</c:if>--%>
</form>

