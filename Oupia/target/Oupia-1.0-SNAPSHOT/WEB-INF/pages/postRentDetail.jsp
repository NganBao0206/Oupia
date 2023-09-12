<%-- 
    Document   : motelDetail
    Created on : Aug 15, 2023, 7:50:27 PM
    Author     : yuu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/posts/rent/storage/" var="action" />
<form:form modelAttribute="detailRent" action="${action}" method="POST" enctype="multipart/form-data">
    <form:hidden path="id"/>
        <form:hidden path="postId.id"/>

    <div class="container-fluid">
        <div class="col-12">
            <h3 class="my-4 fw-bold">Bài đăng</h3>
            <div class="form-floating mb-3">
                <form:input path="postId.title" type="text" class="form-control" id="titleInput" placeholder="title"/>
                <form:errors path="postId.title" element="div" cssClass="text-danger my-2 px-2"/>
                <label for="titleInput">Tiêu đề</label>
            </div>
            <div class="form-floating mb-3">
                <form:textarea path="postId.description" class="form-control" placeholder="Chi tiết" id="i" style="min-height: 200px"/>
                <label for="i">Chi tiết</label>
            </div>
            <form:errors path="postId.description" element="div" cssClass="text-danger my-2 px-2"/>
            <div class="row">
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <c:if test="${empty detailRent.postId.userId}">
                            <label id="labelOwner" for="ownerInput">Chọn chủ trọ</label>
                        </c:if>
                        <c:url value="/admin/motels/" var="apiPath"/>
                        <form:select onchange="getMotels(this, '${apiPath}')" path="postId.userId" class="py-3 selectpicker form-control h-100" id="ownerInput" aria-label="user">
                            <c:if test="${empty detailRent.motelId.userId}">
                                <option disabled selected></option>
                            </c:if>
                            <c:forEach items="${landlords}" var="user">
                                <c:choose>
                                    <c:when test="${user.id == detailRent.postId.userId.id}">
                                        <option username="${user.username}" selected value="${user.id}">${user.username} - ${user.fullName}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option username="${user.username}" value="${user.id}">${user.username} - ${user.fullName}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </form:select>
                    </div>
                    <form:errors path="postId.userId" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="form-floating">
                        <c:if test="${empty detailRent.motelId}">
                            <label id="labelMotel" for="motelInput">Chọn nhà trọ</label>
                        </c:if>
                        <form:select onchange="hideLabelMotel()" path="motelId" class="py-3 form-control h-100" id="motelInput" aria-label="user">
                            <c:if test="${empty detailRent.motelId.userId}">
                                <option disabled selected></option>
                            </c:if>

                        </form:select>
                    </div>
                    <form:errors path="motelId" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                </div>
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
            <c:if test="${empty detailFind.id}">
                <div class="mt-3 col-12">
                    <p class="my-2">Ảnh cho bài đăng</p>
                    <input placeholder="Thêm ảnh minh họa" name="imgImport" onchange="addImage(this)" multiple class="py-3 form-control mt-3 mb-2" type="file" id="inputFile" accept="image/jpeg, image/png"/>
                    <div id="imgsImport" class="d-flex flex-wrap">
                    </div>
                    <form:errors path="imgImport" element="div" cssClass="text-danger px-2"/>
                </div>
            </c:if>
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
<script src="<c:url value="/js/postDetail.js"/>"></script>
<script src="<c:url value="/js/addImage.js"/>"></script>
<script>


    <c:url value="/admin/motels/" var="apiPath"/>
    <c:if test="${not empty detailRent.postId.userId}">
                const userInput = document.querySelector("#ownerInput");
                getMotels(userInput, '${apiPath}', ${detailRent.motelId.id})
    </c:if>


</script>
