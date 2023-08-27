<%-- 
    Document   : userDetail
    Created on : Aug 7, 2023, 10:04:59 AM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div> 
    <c:url value="/users/storage/" var="action" />
    <c:set value="Thông tin tài khoản" var="title"/>
    <c:if test="${empty user.id}">
        <c:set value="Thêm tài khoản" var="title"/>
    </c:if>
    <h3 class="fw-bold text-my-primary">${title}</h3>
    <div class="shadow-sm border border-1 p-4 mb-5 bg-body-tertiary rounded mt-3">
        <form:form modelAttribute="user" action="${action}" method="POST" enctype="multipart/form-data">
            <form:hidden path="id" />
            <form:hidden path="avatar" />
            <form:hidden path="createdAt"/>
            <form:hidden path="updatedAt"/>
            <form:hidden path="oldPassword"/>

            <div class="row mb-3">
                <div class="col">
                    <div class="form-floating mb-3 col">
                        <form:input path="fullName" type="text" class="form-control" id="inputName"  placeholder="" ></form:input>
                            <label for="inputName">Họ tên</label>
                        <form:errors path="fullName" element="div" cssClass="text-danger" />

                    </div>

                    <!-- Text input -->
                    <div class="form-floating mb-3 col">
                        <form:input path="username" type="text" class="form-control" id="inputUsername" placeholder="" />
                        <label for="inputUsername">Tên người dùng</label>
                        <form:errors path="username" element="div" cssClass="text-danger p-0" />
                    </div>


                    <div class="form-floating mb-3">
                        <form:input path="password" type="password" class="form-control" id="inputPassword" placeholder=""/>
                        <label for="inputPassword">Mật khẩu</label>
                        <form:errors path="password" element="div" cssClass="text-danger" />

                    </div>
                    <div class="form-floating mb-3">
                        <form:input path="confirmPassword" type="password" class="form-control" id="inputConfirmPassword" placeholder=""/>
                        <label for="inputConfirmPassword">Xác nhận mật khẩu</label>
                        <form:errors path="confirmPassword" element="div" cssClass="text-danger" />

                    </div>
                    <div class="form-floating">
                        <form:select onchange="checkStatus(this)" path="userRole" class="form-select" id="inputUserRole" aria-label="Floating label select example">
                            <c:forEach items="${userRoles}" var="role">
                                <c:choose>
                                    <c:when test="${user.userRole == role}">
                                        <option selected value="${role}">${role.displayName}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${role}">${role.displayName}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                        </form:select>
                        <label for="inputUserRole">Phân quyền</label>
                        <form:errors path="userRole" element="div" cssClass="text-danger" />
                    </div>

                </div>
                <div class="col justify-content-center d-flex">
                    <div class="bg-secondary bg-opacity-50 rounded-3 d-flex" style="width:350px; height:350px"> 
                        <div id="hiddenAvatar" class="w-100 justify-content-center d-flex flex-wrap align-self-center">
                            <i id="cover" class="w-100 text-center bi bi-cloud-upload-fill display-2 text-white"></i>
                            <p class="align-self-center text-white">Thêm ảnh đại diện</p>
                        </div>
                        <img id="imgAvatar" src="" alt="avatar" class="w-100 h-100 d-none rounded-3" style="object-fit: cover"/>
                    </div>
                </div>
                <div class="mb-3 mt-3">
                    <form:input path="file" onchange="readURL(this)" class="form-control" type="file" id="inputFile" accept="image/gif, image/jpeg, image/png"/>
                </div>
                <form:errors path="file" element="div" cssClass="text-danger" />

            </div>
            <hr/>
            <div class="row mb-3">
                <div class="col">
                    <div class="form-floating">
                        <form:input path="identityNumber" type="text" class="form-control" id="identityNumber" placeholder=""  />
                        <label for="identityNumber">CMND/CCCD</label>
                    </div>
                    <form:errors path="identityNumber" element="div" cssClass="text-danger" />
                </div>
                <div class="col">
                    <div class="form-floating">
                        <form:input path="email" type="email" class="form-control" id="inputEmail" placeholder=""/>
                        <label for="inputEmail">Email</label>
                    </div>
                    <form:errors path="email" element="div" cssClass="text-danger" />

                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <div class="form-floating">
                        <form:select path="gender" class="form-select" id="inputGender" aria-label="Floating label select example" >
                            <c:forEach items="${genders}" var="gender">
                                <c:choose>
                                    <c:when test="${user.gender == gender}">
                                        <option selected value="${gender}">${gender.displayName}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${gender}">${gender.displayName}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </form:select>
                        <label for="inputGender">Giới tính</label>
                    </div>
                    <form:errors path="gender" element="div" cssClass="text-danger" />

                </div>
                <div class="col">
                    <div class="form-floating">
                        <form:input path="dob" type="date" class="form-control" id="inputDob" placeholder="" />
                        <label for="inputDob">Ngày sinh</label>
                    </div>
                    <form:errors path="dob" element="div" cssClass="text-danger" />
                </div>

            </div>
            <div class="mb-3 col-12">
                <div class="form-floating">
                    <form:select path="status" class="form-select" id="statusInput" aria-label="status">
                        <c:forEach items="${status}" var="s">
                            <c:choose>
                                <c:when test="${user.status == s}">
                                    <option selected value="${s}">${s.displayName}</option>
                                </c:when>
                                <c:otherwise>
                                    <option value="${s}">${s.displayName}</option>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </form:select>
                    <label for="inputUserRole">Tình trạng</label>
                    <form:errors path="status" element="div" cssClass="text-danger" />
                </div>
            </div>

            <div class="row mb-3 mt-4">
                <div class="col">
                    <c:url value="/users/" var="urlBack"/>

                    <a href="${urlBack}" type="button" class="btn btn-outline-dark btn-block mb-3 w-100 p-3">Hủy</a>
                </div>
                <div class="col">
                    <c:set value="Cập nhật" var="btnText"/>
                    <c:if test="${empty user.id}">
                        <c:set value="Thêm" var="btnText"/>
                    </c:if>
                    <buton type="submit" onclick="submitForm()" class="btn btn-dark btn-block mb-3 w-100 p-3">${btnText}</button>
                </div>
            </div>

        </form:form>
    </div>

</div>
<script src="<c:url value="/js/userDetail.js"/>"></script>
<script>
                        var userAvatar = '${user.avatar}';
                        if (userAvatar !== '') {
                            showAvatar(userAvatar)
                        }

                        checkStatus(document.querySelector("#inputUserRole"));
</script>
