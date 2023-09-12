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
                <li class="breadcrumb-item active" aria-current="page">Nhà trọ</li>
                </c:when>
                <c:otherwise>
                    <c:url value="/motels/" var="motelUrl"/>

                <li class="breadcrumb-item"><a href="${motelUrl}">Nhà trọ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Thùng rác</li>

            </c:otherwise>
        </c:choose>
    </ol>
</nav>


<form class="mt-4">
    <div class="d-flex align-items-center">
        <c:choose>
            <c:when test="${params.isDeleted == '0'}">
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Quản lý nhà trọ</h3>
                <c:url value="/motels/storage/" var="url"/>
                <a href="${url}" type="button" class="btn text-white btn-my-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px">
                    <i class="d-flex justify-content-center bi bi-plus display-6"></i>
                </a>
                <c:url value="/motels/bin/" var="urlBin"/>

                <a href="${urlBin}" type="button" class="ms-auto btn text-white btn-my-primary d-flex align-items-center justify-content-center">
                    Thùng rác <i class="bi bi-trash ms-2"></i>
                </a>
            </c:when>
            <c:otherwise>
                <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Nhà trọ không còn hoạt động</h3>
            </c:otherwise>
        </c:choose>


    </div>
    <div class="input-group mb-3 mt-3">
        <input value="${params.kw}" id="kw" type="text" name="kw" class="form-control" placeholder="Nhập từ khóa..." aria-label="Nháº­p tá»« khÃ³a" aria-describedby="button-addon2">
        <button class="btn btn-dark" type="button" onclick="searchFilter()" id="button-addon2">Tìm kiếm</button>
    </div>
    <div class="row mt-2 mx-2 w-100">
        <p class="col-xs-12 col-md-2 fw-bold">Trạng thái:</p>
        <c:forEach items="${status}" var="s">

            <div class="col-xs-12 col-md-2 form-check form-check-inline">
                <c:set var="checked" value=""/>
                <c:forEach items="${statusParams}" var="statusParam">
                    <c:if test="${statusParam eq s.toString()}">
                        <c:set var="checked" value="checked"/>
                    </c:if>
                </c:forEach>
                <input class="form-check-input" type="checkbox" name="status" value="${s}" id="${s}" ${checked}>
                <label class="form-check-label" for="${s}">${s.displayName}</label>
            </div>
        </c:forEach>
        <div class="col-xs-12 col-md text-end">
            <p class="cursor-hand" onclick="uncheckAllStatus()">
                <i class="bi bi-x-square-fill text-dark"></i>
                Xóa bỏ
            </p>
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
        <c:when test="${empty motels}">
            <div class="alert alert-primary bg-my-primary-25 border-my-primary mt-3" role="alert">
                Không tìm thấy nhà trọ nào.
            </div>
        </c:when>
        <c:otherwise>
            <table class="table align-middle mb-0 bg-white mt-3">
                <thead>
                    <tr class="">
                        <th>Tên</th>
                        <th>Chủ trọ</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <c:forEach items="${motels}" var="motel">
                        <tr>
                            <td class="col-6">
                                <div class="d-flex align-items-center py-2">

                                    <div>
                                        <img
                                            src="${motel.image}"
                                            alt="Hình ảnh trọ"
                                            style="width: 150px; height:150px; object-fit: cover"
                                            class="me-3 rounded-3"
                                            />
                                    </div>

                                    <div class="ms-3">
                                        <p class="fw-bold mb-1">${motel.name}</p>
                                        <p class="text-muted mb-0" style="font-size: 12px">${motel.fullLocation}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="fw-normal">${motel.userId.fullName}</p>
                                <p class="text-muted mb-0">@${motel.userId.username}</p>
                            </td>               
                            <td>
                                <p class="fw-normal">${motel.phoneNumber}</p>
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${motel.status == 'PENDING'}">
                                        <p><span class="p-2 badge rounded-pill text-dark bg-warning bg-opacity-25 border border-warning">${status[0].displayName}</span></p>

                                    </c:when>
                                    <c:when test="${motel.status == 'ACCEPTED'}">
                                        <p><span class="p-2 badge rounded-pill text-dark bg-success bg-opacity-25 border border-success">${status[1].displayName}</span></p>
                                        </c:when>
                                        <c:otherwise>
                                        <p><span class="p-2 badge rounded-pill text-dark bg-danger bg-opacity-25 border border-danger">${status[2].displayName}</span></p>
                                        </c:otherwise>    
                                    </c:choose>
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${params.isDeleted == '1'}">
                                        <c:url value="/admin/motels/bin/${motel.slug}/" var="api" />
                                        <a onclick="restoreMotel('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Phục hồi">
                                            <i class="bi bi-arrow-clockwise text-my-primary"></i>
                                        </a>
                                        <a onclick="destroyMotel('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa vĩnh viễn">
                                            <i class="bi bi-trash text-danger"></i>
                                        </a>
                                    </c:when>
                                    <c:otherwise>
                                        <c:url value="/motels/storage/${motel.slug}/" var="editUrl"/>
                                        <a href="${editUrl}" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Chỉnh sửa">
                                            <i class="bi bi-pencil text-my-primary"></i>
                                        </a>
                                        <c:url value="/admin/motels/${motel.slug}/" var="api" />

                                        <a onclick="delMotel('${api}')" type="button" class="btn btn-lg" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Xóa">
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
        let statusChecked = [<c:forEach items="${statusParams}" var="s" varStatus="loop">${loop.index > 0 ? ', ' : ''}'${s}'</c:forEach>];
                let kw = "${empty params.kw ? '' : params.kw}";

        let statusInputs = document.querySelectorAll("input[name=status]");
        statusInputs.forEach(statusInput => {
            statusInput.checked = false;
            statusChecked.forEach(s => {
                if (statusInput.value == s) {
                    statusInput.checked = true;
                }
            })
        })

        document.querySelector("#kw").value = kw;


        inputPage.setAttribute("value", obj.getAttribute("value"));
        document.querySelector("form").submit();
    }

    function searchFilter() {
        let inputPage = document.querySelector("#page").value = "1";
        document.querySelector("form").submit();

    }

    function uncheckAllStatus() {
        let statusInputs = document.querySelectorAll("input[name=status]");
        statusInputs.forEach(input => input.checked = false);
    }

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
</script>

<script src="<c:url value="/js/motels.js"/>"></script>
