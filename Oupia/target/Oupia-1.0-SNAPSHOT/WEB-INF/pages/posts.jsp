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
                <li class="breadcrumb-item active" aria-current="page">Bài đăng</li>
                </c:when>
                <c:otherwise>
                    <c:url value="/posts" var="postsUrl"/>

                <li class="breadcrumb-item"><a href="${postsUrl}">Bài đăng</a></li>
                <li class="breadcrumb-item active" aria-current="page">Thùng rác</li>

            </c:otherwise>
        </c:choose>
    </ol>
</nav>


<form class="mt-4">
    <div class="d-flex align-items-center">
        <c:choose>
            <c:when test="${params.isDeleted == '0'}">
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Quản lý bài đăng</h3>
                <a data-bs-toggle="modal" data-bs-target="#selectModal" type="button" class="btn text-white btn-my-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px">
                    <i class="d-flex align-items-center bi bi-plus display-6"></i>
                </a>
                <c:url value="/posts/bin/" var="urlBin"/>

                <a href="${urlBin}" type="button" class="ms-auto btn text-white btn-my-primary d-flex align-items-center justify-content-center">
                    Thùng rác <i class="bi bi-trash ms-2"></i>
                </a>
            </c:when>
            <c:otherwise>
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Bài đăng bị xóa</h3>
            </c:otherwise>
        </c:choose>


    </div>

    <div class="row align-items-center ms-auto">
        <div class="col-12 col-md-4 mt-3">
            <input value="${params.kw}" id="kw" type="text" name="kw" class="form-control shadow-sm" placeholder="Nhập từ khóa" aria-label="Nhập từ khóa" aria-describedby="button-addon2">
        </div>
        <div class="col-12 col-md-2 mt-3">
            <button type="button" class="w-100 btn border shadow-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-postcard text-my-primary"></i> Loại bài đăng
            </button>
            <ul class="dropdown-menu p-3 border-light-subtle shadow-sm">
                <c:set var="checkTenant" value=""/>
                <c:set var="checkLandlord" value=""/>
                <c:choose>
                    <c:when test="${params.type == 'tenantPost'}">
                        <c:set var="checkTenant" value="checked"/>
                    </c:when>
                    <c:when test="${params.type == 'landlordPost'}">
                        <c:set var="checkLandlord" value="checked"/>
                    </c:when>
                </c:choose>
                <li>
                    <div>
                        <input class="form-check-input" type="radio" name="type" value="tenantPost" id="tenantPost" ${checkTenant}>
                        <label class="form-check-label" for="tenantPost">Bài đăng tìm trọ</label>
                    </div>
                </li>
                <li>
                    <div>
                        <input class="form-check-input" type="radio" name="type" value="landlordPost" id="landlordPost" ${checkLandlord}>
                        <label class="form-check-label" for="landlordPost">Bài đăng cho thuê</label>
                    </div>
                </li>
                <div class="w-100">
                    <p class="cursor-hand" onclick="uncheckAllType()">
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
        <c:when test="${empty posts}">
            <div class="alert alert-primary bg-my-primary-25 border-my-primary mt-3" role="alert">
                Không tìm thấy bài đăng nào.
            </div>
        </c:when>
        <c:otherwise>
            <table class="table align-middle mb-0 bg-white mt-3">
                <thead>
                    <tr class="">
                        <th></th>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Người đăng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <c:forEach items="${posts}" var="post">
                        <tr>
                            <td style="width: 150px">
                                <div>
                                    <c:choose>
                                        <c:when test="${not empty post.image}">
                                            <img
                                                src="${post.image}"
                                                alt="Ảnh thumbnail"
                                                style="width: 150px; height:150px; object-fit: cover"
                                                class="rounded-1 me-3"
                                                />
                                        </c:when>
                                        <c:otherwise>
                                            <img
                                                src="https://www.erindavidson.ca/wp-content/uploads/2018/11/house-illustration-rentback-erin-davidson.png"
                                                alt="Ảnh thumbnail"
                                                style="width: 150px; height:150px; object-fit: cover"
                                                class="rounded-1 me-3"
                                                />
                                        </c:otherwise>
                                    </c:choose>

                                </div>
                            </td>
                            <td style="max-width: 400px">
                                <p>${post.title}</p>
                            </td>
                            <td style="max-width: 300px">
                                <p class="overflow-auto px-3" style="height: 150px">${post.description}</p>
                            </td>               
                            <td>
                                <p class="fw-bold">${post.userId.fullName}</p>
                                <p class="text-mute">@${post.userId.username}</p>
                            </td>

                            <td>
                                <c:choose>
                                    <c:when test="${params.isDeleted == '1'}">
                                        <c:url value="/api/posts/bin/${post.slug}/" var="api" />
                                        <a onclick="restorePost('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Phục hồi">
                                            <i class="bi bi-arrow-clockwise text-my-primary"></i>
                                        </a>
                                        <a onclick="destroyPost('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa vĩnh viễn">
                                            <i class="bi bi-trash text-danger"></i>
                                        </a>
                                    </c:when>
                                    <c:otherwise>
                                        <c:url value="/posts/find/storage/${post.slug}/" var="editUrl"/>
                                        <c:if test="${not empty post.postRentDetail}">
                                            <c:url value="/posts/rent/storage/${post.slug}/" var="editUrl"/>
                                        </c:if>
                                        <a href="${editUrl}" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Chỉnh sửa">
                                            <i class="bi bi-pencil text-my-primary"></i>
                                        </a>
                                        <c:url value="/api/posts/${post.slug}/" var="api" />

                                        <a onclick="delPost('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa">
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
<div class="modal" id="selectModal" tabindex="-1" aria-labelledby="Chọn loại bài đăng" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Chọn loại bài đăng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Hủy"></button>
            </div>
            <div class="modal-body">
                <p>Vui lòng chọn loại bài đăng muốn thêm.</p>
            </div>
            <div class="modal-footer">
                <c:url value="/posts/find/storage/" var="urlFind"/>
                <c:url value="/posts/rent/storage/" var="urlRent"/>
                <a href="${urlFind}" type="button" class="btn btn-my-primary">Bài đăng tìm trọ</a>
                <a href="${urlRent}" type="button" class="btn btn-my-primary">Bài đăng cho thuê</a>
                <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Hủy</button>

            </div>
        </div>
    </div>
</div>
<script>
    function selectPage(obj) {
        let inputPage = document.querySelector("#page");


        let kw = "${empty params.kw ? '' : params.kw}";


//        let userRoleInputs = document.querySelectorAll("input[name=userRole]");
//        userRoleInputs.forEach(roleInput => {
//            roleInput.checked = false;
//            roleChecked.forEach(role => {
//                if (roleInput.value == role) {
//                    roleInput.checked = true;
//                }
//            })
//        })
//
//        let statusInputs = document.querySelectorAll("input[name=status]");
//        statusInputs.forEach(statusInput => {
//            statusInput.checked = false;
//            statusChecked.forEach(s => {
//                if (statusInput.value == s) {
//                    statusInput.checked = true;
//                }
//            })
//        })

//        if (confirm) {
//            if (confirm == '0')
//                document.querySelector("#unconfirmed").checked = true;
//            else if (confirm == '1')
//                document.querySelector("#confirmed").checked = true;
//        } else {
//            document.querySelector("#unconfirmed").checked = false;
//            document.querySelector("#confirmed").checked = false;
//        }

        document.querySelector("#kw").value = kw;


        inputPage.setAttribute("value", obj.getAttribute("value"));
        document.querySelector("form").submit();
    }

    function searchFilter() {
        let inputPage = document.querySelector("#page").value = "1";
        document.querySelector("form").submit();

    }

    function uncheckAllType() {
        let userRoleInputs = document.querySelectorAll("input[name=type]");
        userRoleInputs.forEach(input => input.checked = false);
    }


    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
</script>

<script src="<c:url value="/js/posts.js"/>"></script>
