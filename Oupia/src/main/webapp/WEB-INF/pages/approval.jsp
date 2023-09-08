<%-- 
    Document   : users
    Created on : Aug 6, 2023, 7:16:04 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:url value="/" var="homeUrl"/>
<a id="btnShow" data-bs-toggle="modal" data-bs-target="#selectModal" type="button" class="d-none" />

<nav aria-label="breadcrumb mb-3">
    <ol class="breadcrumb border border-1 rounded-3 shadow-sm p-3">
        <li class="breadcrumb-item"><a href="${homeUrl}">Trang chủ</a></li>
            <c:url value="/users" var="usersUrl"/>
        <li class="breadcrumb-item"><a href="${usersUrl}">Người dùng</a></li>
        <li class="breadcrumb-item active" aria-current="page">Xét duyệt</li>
    </ol>
</nav>

<div class="d-flex col-12 mt-5">
    <div class="col-4 pe-4">
        <div class="w-100 h-100 bg-white shadow rounded rounded-3 p-4">
            <div class="d-flex justify-content-center">
                <img
                    id="avatar"
                    src="${user.avatar}"
                    class="rounded-circle"
                    height="150"
                    alt="avatar"
                    loading="lazy"
                    />
            </div>
            <p class="text-center mt-3 fs-4 mb-0">${user.fullName}</p>
            <p class="text-center text-secondary">@${user.username}</p>
            <div class="d-flex col-12 my-1 mt-3">
                <p class="col-6 ">Ngày sinh:</p>
                <p class="col-6">
                    <fmt:formatDate value="${user.dob}" pattern="dd-MM-yyyy" />
                </p>
            </div>
            <div class="d-flex col-12 my-1">
                <p class="col-6 ">Giới tính:</p>
                <p class="col-6">
                    <c:choose>
                        <c:when test="${user.gender == 'MALE'}">Nam</c:when>
                        <c:when test="${user.gender == 'FEMALE'}">Nữ</c:when>
                        <c:otherwise>Khác</c:otherwise>
                    </c:choose>
                </p>
            </div>
            <div class="d-flex col-12 my-1">
                <p class="col-6">Email:</p>
                <p class="col-6">${user.email}</p>
            </div>
            <div class="d-flex col-12 my-1">
                <p class="col-6">CMND/CCCD:</p>
                <p class="col-6">${user.identityNumber}</p>
            </div>
            <c:if test="${user.status == 'PENDING'}">
                <div class="d-flex justify-content-between mt-5">
                    <c:url value='/admin/users-approval/${user.id}/?status=UNACCEPTED' var="urlReject"/>
                    <c:url value='/admin/users-approval/${user.id}/?status=ACCEPTED' var="urlAccept"/>

                    <button class="btn btn-dark p-3" onclick="reject('${urlReject}')">Không duyệt</button>
                    <button class="btn btn-my-primary p-3" onclick="approval('${urlAccept}', true)">Duyệt người dùng</button>
                </div>
            </c:if>

        </div>
    </div>
    <div class="col-4 pe-4">
        <div class="w-100 h-100 bg-white shadow rounded rounded-3 p-4">
            <div class="d-flex justify-content-center text-my-primary">
                Thông tin nhà trọ
            </div>
            <p class="text-center mt-3 fs-4 mb-0">${motel.name}</p>
            <div class="d-flex col-12 my-1 mt-3">
                <p class="col-6 ">Địa chỉ:</p>
                <p class="col-6">${motel.fullLocation}</p>
            </div>
            <div class="d-flex col-12 my-1 mt-3">
                <p class="col-6 ">Số điện thoại:</p>
                <p class="col-6">${motel.phoneNumber}</p>
            </div>
            <c:if test="${user.status != 'PENDING'}">
                <div class="d-flex justify-content-between mt-5">
                    <c:url value='/admin/motels-approval/${motel.id}/?status=UNACCEPTED' var="urlReject"/>
                    <c:url value='/admin/motels-approval/${motel.id}/?status=ACCEPTED' var="urlAccept"/>

                    <button class="btn btn-dark p-3" onclick="reject('${urlReject}')">Không duyệt</button>
                    <button class="btn btn-my-primary p-3" onclick="approval('${urlAccept}')">Duyệt nhà trọ</button>
                </div>
            </c:if>
        </div>
    </div>
    <div class="col-4 h-80">
        <div class="w-100 h-100 bg-white shadow rounded rounded-3 p-4">
            <div class="d-flex justify-content-center text-my-primary">
                Thông tin bài đăng
            </div>
            <div class="d-flex justify-content-center mt-3">
                <img
                    id="avatar"
                    src="${user.avatar}"
                    class="w-100"
                    style="height: 250px; object-fit: cover"
                    alt="avatar"
                    loading="lazy"
                    />
            </div>
            <div class="d-flex col-12 my-1 mt-3">
                <p class="col fs-5">${post.title}</p>
            </div>
            <div class="d-flex col-12 my-1">
                <p class="text-my-primary">${post.postRentDetail.price} đ/tháng</p>
            </div>
            <hr/>
            <div class="d-flex">
                <div class="col-4 pe-2">
                    <div class="p-2 shadow-sm rounded rounded-3 text-center border border-1">
                        ${post.postRentDetail.numOfBedrooms} Phòng ngủ
                    </div>
                </div>
                <div class="col-4 pe-2">
                    <div class="p-2 shadow-sm rounded rounded-3 text-center border border-1">
                        ${post.postRentDetail.numOfBathrooms} Phòng tắm
                    </div>
                </div>
                <div class="col-4 pe-2">
                    <div class="p-2 shadow-sm rounded rounded-3 text-center border border-1">
                        ${post.postRentDetail.minPeople} - ${post.postRentDetail.maxPeople} Người
                    </div>
                </div>
            </div>
            <hr/>
            <p>Mô tả:</p>
            <div class="d-flex col-12 text-secondary">
                ${post.description}
            </div>
        </div>
    </div>
</div>
<div class="modal" id="selectModal" aria-labelledby="Bạn có muốn tiếp tục duyệt nhà trọ của người dùng này không" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Duyệt thành công</h5>
            </div>
            <div class="modal-body">
                <p>Bạn có muốn tiếp tục duyệt nhà trọ của người dùng này không.</p>
            </div>
            <div class="modal-footer">
                <c:url value="/users" var="urlUser"/>
                <c:url value="/motels-approval/${motel.slug}" var="urlMotel"/>
                <a href="${urlUser}" type="button" class="btn btn-dark px-3 me-3">Để sau</a>
                <a href="${urlMotel}" type="button" class="btn btn-my-primary">TIếp tục duyệt nhà trọ</a>
            </div>
        </div>
    </div>
</div>
<script src="<c:url value="/js/approval.js"/>"></script>
