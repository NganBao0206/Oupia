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
                    <form:errors path="motelId.name" element="div" cssClass="text-danger my-2 px-2"/>

                    <label for="nameInput">Tên nhà trọ</label>
                </div>

                <div class="form-floating mb-3">
                    <form:input path="motelId.fullLocation" type="text" data-bs-toggle="dropdown" aria-expanded="false" class="form-control position-relative" id="addressInput" placeholder="address"/>
                    <ul id="resultAddress" style="z-index: 99;" class="dropdown-menu p-3 shadow-sm bg-light border border-1 w-100">
                    </ul>
                    <form:errors path="motelId.fullLocation" element="div" cssClass="text-danger my-2 px-2"/>

                    <label for="addressInput">Địa chỉ</label>
                </div>


                <div class="row">
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating">
                            <c:if test="${empty detail.motelId.userId}">
                                <label id="labelOwner" for="ownerInput">Chọn chủ trọ</label>
                            </c:if>
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
                        <form:errors path="motelId.userId" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                    </div>
                    <div class="col-xs-12 col-md-6 mb-3">
                        <div class="form-floating">
                            <form:input path="motelId.phoneNumber" type="number" class="form-control h-100" id="phoneInput" placeholder="phoneNumber"/>
                            <label for="phoneInput">Số điện thoại trọ</label>
                        </div>
                        <form:errors path="motelId.phoneNumber" element="div" cssClass="text-danger w-100 my-2 px-2"/>
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
                <form:errors path="postId.title" element="div" cssClass="text-danger my-2 px-2"/>
                <label for="titleInput">Tiêu đề</label>
            </div>
            <div class="form-floating mb-3">
                <form:textarea path="postId.description" class="form-control" placeholder="Chi tiết" id="i" style="min-height: 200px"/>
                <form:errors path="postId.description" element="div" cssClass="text-danger my-2 px-2"/>
                <label for="i">Chi tiết</label>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating">
                        <form:input path="area" type="number" class="form-control h-100" id="areaInput" placeholder="area"/>
                        <span class="input-group-text rounded-end-3">m²</span>
                        <label for="areaInput">Diện tích</label>
                    </div>
                    <form:errors path="area" element="div" cssClass="text-danger my-2 px-2"/>

                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating">
                        <form:input path="price" type="number" class="form-control h-100" id="priceInput" placeholder="price"/>
                        <span class="input-group-text rounded-end-3">đ/tháng</span>
                        <label for="priceInput">Giá</label>
                    </div>
                    <form:errors path="price" element="div" cssClass="text-danger my-2 px-2"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <form:input path="numOfBedrooms" type="number" class="form-control h-100" id="bedInput" placeholder="area"/>
                        <label for="bedInput">Số phòng ngủ</label>
                    </div>
                    <form:errors path="numOfBedrooms" element="div" cssClass="text-danger my-2 px-2"/>

                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <form:input path="numOfBathrooms" type="number" class="form-control h-100" id="bathInput" placeholder="price"/>
                        <label for="bathInput">Số phòng tắm</label>
                    </div>
                    <form:errors path="numOfBathrooms" element="div" cssClass="text-danger my-2 px-2"/>

                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <form:input path="minPeople" type="number" class="form-control h-100" id="minPeopleInput" placeholder="minPeople"/>
                        <label for="minPeopleInput">Số người tối thiểu</label>
                    </div>             
                    <form:errors path="minPeople" element="div" cssClass="text-danger my-2 px-2"/>

                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <form:input path="maxPeople" type="number" class="form-control h-100" id="maxPeopleInput" placeholder="maxPeople"/>
                        <label for="maxPeopleInput">Số người tối đa</label>
                    </div>               
                    <form:errors path="maxPeople" element="div" cssClass="text-danger my-2 px-2"/>
                </div>
            </div>
            <div class="mt-3 col-12">
                <p class="my-2">Ảnh nhà trọ cho bài đăng (ít nhất 3 ảnh)</p>
                <input placeholder="Thêm ảnh minh họa" name="imgImport" onchange="addImage(this)" multiple class="py-3 form-control mt-3 mb-2" type="file" id="inputFile" accept="image/jpeg, image/png"/>
                <div id="imgsImport" class="d-flex flex-wrap">
                </div>
                <form:errors path="imgImport" element="div" cssClass="text-danger px-2"/>
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
<script src="<c:url value="/js/map.js"/>"></script>
<script src="<c:url value="/js/addImage.js"/>"></script>

<script>
                init();
                function submitForm() {
                    document.querySelector("form").submit();
                }
                function hideLabel() {
                    document.querySelector("#labelOwner").classList.add("d-none");
                }
                function removeImg(obj) {
                    obj.parentElement.remove()
                }

</script>
