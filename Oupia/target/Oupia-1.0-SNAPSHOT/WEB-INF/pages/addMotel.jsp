<%-- 
    Document   : motelDetail
    Created on : Aug 15, 2023, 7:50:27 PM
    Author     : yuu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/motels/storage/" var="action" />

<form:form modelAttribute="detail" action="${action}" method="POST" enctype="multipart/form-data">
    <form:hidden path="id"/>
    <form:errors path="*" element="div" cssClass="text-danger"/>
    <div class="container-fluid">
        <div class="row">
            <h3 class="my-4 fw-bold">Thông tin trọ</h3>
            <div class="col-12">
                <form:hidden path="motelId.locationLongitude" id="longitudeInput"/>
                <form:errors path="motelId.locationLongitude" element="div" cssClass="text-danger"/>
                <form:hidden path="motelId.locationLatitude" id="latitudeInput"/>
                <form:errors path="motelId.locationLatitude" element="div" cssClass="text-danger"/>

                <div class="form-floating mb-3">
                    <form:input path="motelId.name" type="text" class="form-control" id="nameInput" placeholder="name"/>
                    <form:errors path="motelId.name" element="div" cssClass="text-danger"/>

                    <label for="nameInput">Tên nhà trọ</label>
                </div>

                <div class="form-floating mb-3">
                    <form:input path="motelId.fullLocation" type="text" class="form-control" id="addressInput" placeholder="address"/>
                    <form:errors path="motelId.fullLocation" element="div" cssClass="text-danger"/>

                    <label for="addressInput">Địa chỉ</label>
                </div>


                <div class="row align-items-stretch">
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating h-100">
                            <label id="label" for="ownerInput">Chọn chủ trọ</label>
                            <form:select onchange="hideLabel()" path="motelId.userId" class="py-3 selectpicker form-control h-100" id="ownerInput" aria-label="user">
                                <c:if test="${empty detail.motelId.userId}">
                                    <option disabled selected></option>
                                </c:if>
                                <c:forEach items="${users}" var="user">
                                    <c:choose>
                                        <c:when test="${user.id == motelId.userId.id}">
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
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating h-100">
                            <form:input path="motelId.phoneNumber" type="number" class="form-control h-100" id="phoneInput" placeholder="phoneNumber"/>
                            <label for="phoneInput">Số điện thoại trọ</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col-5">
                        <form:errors path="motelId.userId" element="div" cssClass="text-danger w-100"/>
                    </div>
                    <div class="col-5">
                        <form:errors path="motelId.phoneNumber" element="div" cssClass="text-danger w-100"/>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-3" style="height: 500px">
                <div class="map rounded-3" id="gmp-map" style="height: 100%"></div>
            </div>

        </div>

        <div class="col-12">
            <h3 class="my-4 fw-bold">Bài đăng đầu tiên</h3>
            <div class="form-floating mb-3">
                <form:input path="postId.title" type="text" class="form-control" id="titleInput" placeholder="title"/>
                <form:errors path="postId.title" element="div" cssClass="text-danger"/>
                <label for="titleInput">Tiêu đề</label>
            </div>
            <div class="form-floating mb-3">
                <form:textarea path="postId.description" class="form-control" placeholder="Chi tiết" id="i" style="min-height: 200px"/>
                <form:errors path="postId.description" element="div" cssClass="text-danger"/>
                <label for="i">Chi tiết</label>
            </div>
            <div class="row align-items-stretch">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating h-100">
                        <form:input path="area" type="number" class="form-control h-100" id="areaInput" placeholder="area"/>
                        <span class="input-group-text rounded-end-3">m²</span>
                        <form:errors path="area" element="div" cssClass="text-danger"/>
                        <label for="areaInput">Diện tích</label>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating h-100">
                        <form:input path="price" type="number" class="form-control h-100" id="priceInput" placeholder="price"/>
                        <span class="input-group-text rounded-end-3">đ/tháng</span>
                        <form:errors path="price" element="div" cssClass="text-danger"/>
                        <label for="priceInput">Giá</label>
                    </div>
                </div>
            </div>
            <div class="row align-items-stretch">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating h-100">
                        <form:input path="numOfBedrooms" type="number" class="form-control h-100" id="bedInput" placeholder="area"/>
                        <form:errors path="numOfBedrooms" element="div" cssClass="text-danger"/>
                        <label for="bedInput">Số phòng ngủ</label>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating h-100">
                        <form:input path="numOfBathrooms" type="number" class="form-control h-100" id="bathInput" placeholder="price"/>
                        <form:errors path="numOfBathrooms" element="div" cssClass="text-danger"/>
                        <label for="bathInput">Số phòng tắm</label>
                    </div>
                </div>
            </div>
            <div class="row align-items-stretch">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating h-100">
                        <form:input path="minPeople" type="number" class="form-control h-100" id="minPeopleInput" placeholder="minPeople"/>
                        <form:errors path="minPeople" element="div" cssClass="text-danger"/>
                        <label for="minPeopleInput">Số người tối thiểu</label>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating h-100">
                        <form:input path="maxPeople" type="number" class="form-control h-100" id="maxPeopleInput" placeholder="maxPeople"/>
                        <form:errors path="maxPeople" element="div" cssClass="text-danger"/>
                        <label for="maxPeopleInput">Số người tối đa</label>
                    </div>
                </div>
            </div>
            <div class="mt-3 col-12">
                <div class="d-flex">
                    <p class="my-2">Ảnh nhà trọ cho bài đăng (ít nhất 3 ảnh)</p>
                    <button id="btnGetGoogleImgs" class="btn btn-dark ms-2" type="button">Nạp ảnh từ google</button>
                </div>
                <input name="portId.imgImport" onchange="addImage(this)" multiple class="py-3 form-control my-3" type="file" id="inputFile" accept="image/jpeg, image/png"/>
                <div id="imgsImport" class="d-flex flex-wrap">
                </div>
                <div id="imgsFromGoogle" class="d-flex flex-wrap">
                    <div class="bg-my-primary-5"></div>
                </div>
            </div>
        </div>
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
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5sUsaAUPrpOhRyOyDxTZY-nbBa6aXVf0&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cABC" async defer></script>

<script>

                function submitForm() {
                    document.querySelector("form").submit();
                }
                function hideLabel() {
                }
                function removeImg(obj) {
                    obj.parentElement.remove()
                }

</script>
