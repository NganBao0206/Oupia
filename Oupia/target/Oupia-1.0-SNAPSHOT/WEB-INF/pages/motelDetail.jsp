<%-- 
    Document   : motelDetail
    Created on : Aug 15, 2023, 7:50:27 PM
    Author     : yuu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/motels/storage/" var="action" />

<form:form modelAttribute="motel" action="${action}" method="POST" enctype="multipart/form-data">
    <h3>Thêm nhà trọ</h3>
    <form:hidden path="id"/>
    <form:errors path="*" element="div" cssClass="text-danger"/>
    <div class="container-fluid">
        <div class="row">
            <div class="col-7">
                <form:hidden path="locationLongitude" id="longitudeInput"/>
                <form:errors path="locationLongitude" element="div" cssClass="text-danger"/>
                <form:hidden path="locationLatitude" id="latitudeInput"/>
                <form:errors path="locationLatitude" element="div" cssClass="text-danger"/>

                <div class="form-floating mb-3">
                    <form:input path="name" type="text" class="form-control" id="nameInput" placeholder="name"/>
                    <form:errors path="name" element="div" cssClass="text-danger"/>

                    <label for="nameInput">Tên nhà trọ</label>
                </div>

                <div class="form-floating mb-3">
                    <form:input path="fullLocation" type="text" class="form-control" id="addressInput" placeholder="address"/>
                    <form:errors path="fullLocation" element="div" cssClass="text-danger"/>

                    <label for="addressInput">Địa chỉ</label>
                </div>

                <div class="row align-items-stretch">
                    <div class="col-xs-12 col-md-6 ">
                        <div class="form-floating h-100">
                            <c:if test="${empty motel.userId}">
                                <label id="label" for="ownerInput">Chọn chủ trọ</label>
                            </c:if>
                            <form:select onchange="hideLabel()" path="userId" class="selectpicker form-control h-100" id="ownerInput" aria-label="user">
                                <c:if test="${empty motel.userId}">
                                    <option disabled selected></option>
                                </c:if>
                                <c:forEach items="${users}" var="user">
                                    <c:choose>
                                        <c:when test="${user.id == motel.userId.id}">
                                            <option selected value="${user.id}">${user.username} - ${user.fullName}</option>
                                        </c:when>
                                        <c:otherwise>
                                            <option value="${user.id}">${user.username} - ${user.fullName}</option>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </form:select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="form-floating h-100">
                            <form:input path="phoneNumber" type="number" class="form-control h-100" id="phoneInput" placeholder="phoneNumber"/>
                            <label for="phoneInput">Số điện thoại trọ</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col-5">
                        <form:errors path="userId" element="div" cssClass="text-danger"/>
                    </div>
                    <div class="col-5">
                        <form:errors path="phoneNumber" element="div" cssClass="text-danger"/>
                    </div>
                </div>
                <div class="form-floating mt-3">
                    <form:textarea path="description" class="form-control" placeholder="Description" id="descriptionInput" style="min-height:500px"/>
                    <form:errors path="description" element="div" cssClass="text-danger"/>

                    <label for="descriptionInput">Mô tả</label>
                </div>
            </div>
            <div class="col-5">
                <div class="map" id="gmp-map" style="height: 100%"></div>
            </div>

        </div>
        <c:if test="${empty motel.id}">
            <div class="mt-3 col-12">
                <div class="d-flex">
                    <p class="my-2">Ảnh nhà trọ thêm</p>
                    <button id="btnGetGoogleImgs" class="btn btn-dark ms-2" type="button">Nạp ảnh từ google</button>
                </div>
                <input name="imgImport" onchange="addImage(this)" multiple class="form-control my-3" type="file" id="inputFile" accept="image/gif, image/jpeg, image/png"/>
                <div id="imgsImport" class="d-flex flex-wrap">
                </div>
                <div id="imgsFromGoogle" class="d-flex flex-wrap">
                    <div class="bg-my-primary-5"></div>
                </div>
            </div>
        </c:if>

    </div>
    <div class="mt-3 row">
        <div class="col-12 col-md-7">
            <button class="btn btn-my-primary col-12 col-md-7 w-100 p-3" id="btnSubmit" onclick="submitForm()" type="button">Thêm trọ</button>
        </div>
        <div class="col-12 col-md-5">
            <button class="btn btn-outline-dark col-12 col-md-5 w-100 p-3" type="button">Hủy</button>
        </div>
    </div>
</form:form>
<script src="<c:url value="/js/selectorAutocomplete.js"/> "></script>
<script src="<c:url value="/js/motelDetail.js"/>"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzxzB92Cnje6rgg4kQzenDUPZpR9G4Taw&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cABC" async defer></script>
<script>
    <c:if test="${not empty motel.id}">
                setLatLng(${motel.locationLatitude}, ${motel.locationLongitude}, true)
                                    document.querySelector("#label").classList.add("d-none");


    </c:if>
                function submitForm() {
                    document.querySelector("form").submit();
                }
                function hideLabel() {
    <c:if test="${not empty motel.id}">
                    document.querySelector("#label").classList.add("d-none");

    </c:if>
                }
</script>
