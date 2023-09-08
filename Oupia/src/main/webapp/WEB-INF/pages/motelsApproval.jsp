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
            <c:url value="/motels" var="motelsUrl"/>
        <li class="breadcrumb-item"><a href="${motelsUrl}">Nhà trọ</a></li>
        <li class="breadcrumb-item active" aria-current="page">Xét duyệt</li>
    </ol>
</nav>


<form class="mt-4">
    <div class="d-flex align-items-center">
        <h3 class="fw-bold text-my-primary w-fit-content m-0 me-2">Xét duyệt nhà trọ</h3>
    </div>

    <div class="row align-items-center">
        <div class="col-12 col-md-10 mt-3">
            <input value="${params.kw}" id="kw" type="text" name="kw" class="form-control shadow-sm" placeholder="Nhập từ khóa" aria-label="Nhập từ khóa" aria-describedby="button-addon2">
        </div>
        <div class="col-12 col-md-2 mt-3">
            <button class="w-100 btn text-white btn-my-primary border shadow-sm" type="button" onclick="searchFilter()" id="button-addon2">Tìm kiếm</button>
        </div>

    </div>
    <c:choose>
        <c:when test="${empty motels}">
            <div class="alert alert-primary bg-my-primary-25 border-my-primary mt-3" role="alert">
                Không có đơn xét duyệt.
            </div>
        </c:when>
        <c:otherwise>
            <table class="table align-middle mb-0 bg-white mt-3">
                <thead>
                    <tr class="">
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Số địện thoại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <c:forEach items="${motels}" var="motel">
                        <tr>
                            <td>
                                <p class="mb-0 fw-bold">${motel.name}</p>
                            </td>
                            <td>
                                <p class="fw-normal">${motel.fullLocation}</p>
                            </td>               
                            <td>
                                <p class="fw-normal">${motel.phoneNumber}</p>

                            </td>
                            <td>
                                <c:url value="/motels-approval/${motel.slug}" var ="url"/>
                                <a class="ms-auto btn text-white btn-my-primary d-flex align-items-center justify-content-center" href="${url}">Xét duyệt <i class="bi bi-pen ms-3"></i></a>
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
        let kw = "${empty params.kw ? '' : params.kw}";

        document.querySelector("#kw").value = kw;


        inputPage.setAttribute("value", obj.getAttribute("value"));
        document.querySelector("form").submit();
    }

    function searchFilter() {
        let inputPage = document.querySelector("#page").value = "1";
        document.querySelector("form").submit();

    }


    function uncheckAllConfirm() {
        let confirmInputs = document.querySelectorAll("input[name=isConfirm]");
        confirmInputs.forEach(input => input.checked = false);
    }



    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
</script>

<script src="<c:url value="/js/users.js"/>"></script>
