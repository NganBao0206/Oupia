<%-- 
    Document   : login
    Created on : Aug 14, 2023, 1:57:01 PM
    Author     : yuu
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<c:url value="/login" var="action" />
<div class="d-flex justify-content-center">
    <form method="post" action="${action}" class="bg-dark shadow-sm rounded-4 p-5 mt-5 col-xs-12 col-md-6">
        <h3 class="text-center text-white mb-4">Đăng nhập</h3>
        <div class="form-floating mb-4">
            <input type="text" class="form-control" id="username" placeholder="Nhập username..." name="username">
            <label for="username">Tên đăng nhập</label>
        </div>

        <div class="form-floating mb-4">
            <input type="password" class="form-control" id="pwd" placeholder="Nhập mật khẩu..." name="password">
            <label for="pwd">Mật khẩu</label>
        </div>

        <div class="form-floating                                                                      ">
            <input type="submit" value="Đăng nhập" class="btn btn-outline-light p-3 w-100" />
        </div>
    </form>

</div>

