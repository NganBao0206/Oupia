<%-- 
    Document   : motelDetail
    Created on : Aug 15, 2023, 7:50:27 PM
    Author     : yuu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/motels/storage/${slug}/" var="action" />

<form:form modelAttribute="motel" action="${action}" enctype="multipart/form-data">
    <form:hidden path="id"/>
    <div class="container-fluid">
        <div class="row">
            <h3 class="my-4 fw-bold">Thông tin trọ</h3>
            <div class="col-12">
                <form:hidden path="locationLongitude" id="longitudeInput"/>
                <form:errors path="locationLongitude" element="div" cssClass="text-danger"/>
                <form:hidden path="locationLatitude" id="latitudeInput"/>
                <form:errors path="locationLatitude" element="div" cssClass="text-danger"/>

                <div class="form-floating mb-3">
                    <form:input path="name" type="text" class="form-control" id="nameInput" placeholder="name"/>
                    <form:errors path="name" element="div" cssClass="text-danger my-2 px-2"/>

                    <label for="nameInput">Tên nhà trọ</label>
                </div>

                <div class="form-floating mb-3">
                    <form:input path="fullLocation" type="text" data-bs-toggle="dropdown" aria-expanded="false" class="form-control position-relative" id="addressInput" placeholder="address"/>
                    <ul id="resultAddress" style="z-index: 99;" class="dropdown-menu p-3 shadow-sm bg-light border border-1 w-100">
                    </ul>
                    <form:errors path="fullLocation" element="div" cssClass="text-danger my-2 px-2"/>

                    <label for="addressInput">Địa chỉ</label>
                </div>


                <div class="row">
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating">
                            <c:if test="${empty motel.userId}">
                                <label id="labelOwner" for="ownerInput">Chọn chủ trọ</label>
                            </c:if>
                            <form:select onchange="hideLabel()" path="userId" class="py-3 selectpicker form-control h-100" id="ownerInput" aria-label="user">
                                <c:if test="${empty detail.motelId.userId}">
                                    <option disabled selected></option>
                                </c:if>
                                <c:forEach items="${users}" var="user">
                                    <div>${user} + ${userId.userRole}</div>
                                    <c:choose>
                                        <c:when test="${user == motel.userId}">
                                            <option selected value="${user.id}">${user.username} - ${user.fullName}</option>
                                        </c:when>
                                        <c:otherwise>
                                            <option value="${user.id}">${user.username} - ${user.fullName}</option>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </form:select>

                        </div>
                        <form:errors path="userId" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                    </div>
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating">
                            <form:input path="phoneNumber" type="number" class="form-control h-100" id="phoneInput" placeholder="phoneNumber"/>
                            <label for="phoneInput">Số điện thoại trọ</label>
                        </div>
                        <form:errors path="phoneNumber" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3" style="height: 500px">
                <div class="map rounded-3" id="gmp-map" style="height: 100%"></div>
            </div>

        </div>

    </div>
    <div class="mt-3 row">
        <div class="col-12 col-md-7">
            <button class="btn btn-my-primary col-12 col-md-7 w-100 p-3" id="btnSubmit" onclick="submitForm()" type="button">Cập nhật</button>
        </div>
        <div class="col-12 col-md-5">
            <button class="btn btn-outline-dark col-12 col-md-5 w-100 p-3" type="button">Hủy</button>
        </div>
    </div>
</form:form>
<script src="<c:url value="/js/selectorAutocomplete.js"/> "></script>
<script src="<c:url value="/js/motelDetail.js"/>"></script>
<script>
    <c:if test="${not empty motel.id}">
                setLatLng(${motel.locationLatitude}, ${motel.locationLongitude})
                init()
    </c:if>
                const form = document.querySelector('form');
                form.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const data = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'PATCH',
                        body: data
                    });
                });


                function submitForm() {
                    const event = new Event('submit');
                    form.dispatchEvent(event);
                }
                function hideLabel() {
                    document.querySelector("#labelOwner").classList.add("d-none");
                }
                function removeImg(obj) {
                    obj.parentElement.remove()
                }

</script>
