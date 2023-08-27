<%-- 
    Document   : motelDetail
    Created on : Aug 15, 2023, 7:50:27 PM
    Author     : yuu
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/posts/find/storage/" var="action" />
<form:form modelAttribute="detailFind" action="${action}" method="POST" enctype="multipart/form-data">
    <form:hidden path="id"/>
    <form:hidden path="postId.id"/>

    <div class="container-fluid">
        <div class="col-12">
            <h3 class="my-4 fw-bold">Bài đăng đầu tiên</h3>
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
                <form:hidden path="locationLongitude" id="longitudeInput"/>
                <form:errors path="locationLongitude" element="div" cssClass="text-danger"/>
                <form:hidden path="locationLatitude" id="latitudeInput"/>
                <form:errors path="locationLatitude" element="div" cssClass="text-danger"/>
                <div class="col-12">
                    <div class="form-floating mb-3">
                        <form:input path="location" type="text" data-bs-toggle="dropdown" aria-expanded="false" class="form-control position-relative" id="addressInput" placeholder="address"/>
                        <ul id="resultAddress" style="z-index: 99;" class="dropdown-menu p-3 shadow-sm bg-light border border-1 w-100">
                        </ul>
                        <form:errors path="location" element="div" cssClass="text-danger my-2 px-2"/>

                        <label for="addressInput">Khu vực</label>
                    </div>
                </div>
                <div class="col-12 mb-3" style="height: 500px">
                    <div class="map rounded-3" id="gmp-map" style="height: 100%"></div>
                </div>

                <div class="col-12 mb-3">
                    <div class="form-floating">
                        <c:if test="${empty detailFind.postId.userId}">
                            <label id="labelOwner" for="ownerInput">Chọn người đăng</label>
                        </c:if>
                        <form:select onchange="hideLabel()" path="postId.userId" class="py-3 selectpicker form-control h-100" id="ownerInput" aria-label="user">
                            <c:if test="${empty detailFind.postId.userId}">
                                <option disabled selected></option>
                            </c:if>
                            <c:forEach items="${tenants}" var="user">
                                <c:choose>
                                    <c:when test="${user.id == detailFind.postId.userId.id}">
                                        <option selected value="${user.id}">${user.username} - ${user.fullName}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${user.id}">${user.username} - ${user.fullName}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </form:select>
                    </div>
                    <form:errors path="postId.userId" element="div" cssClass="text-danger w-100 my-2 px-2"/>
                </div>


                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating">
                        <form:input path="minPrice" type="number" class="form-control h-100" id="minPriceInput" placeholder="price"/>
                        <span class="input-group-text rounded-end-3">đ/tháng</span>
                        <label for="minPriceInput">Giá tối thiểu</label>
                    </div>
                    <form:errors path="minPrice" element="div" cssClass="text-danger my-2 px-2"/>
                </div>
                <div class="col-xs-12 col-md-6 mb-3">
                    <div class="input-group form-floating">
                        <form:input path="maxPrice" type="number" class="form-control h-100" id="maxPriceInput" placeholder="price"/>
                        <span class="input-group-text rounded-end-3">đ/tháng</span>
                        <label for="maxPriceInput">Giá tối đa</label>
                    </div>
                    <form:errors path="maxPrice" element="div" cssClass="text-danger my-2 px-2"/>
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
<script src="<c:url value="/js/addImage.js"/>"></script>
<script src="<c:url value="/js/map.js"/>"></script>
<script>
    <c:if test="${not empty detailFind.id}">
                setLatLng(${detailFind.locationLatitude}, ${detailFind.locationLongitude})
    </c:if>
                setZoom(13);
                init()

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
