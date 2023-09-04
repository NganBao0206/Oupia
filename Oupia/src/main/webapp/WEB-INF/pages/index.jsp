<%-- 
    Document   : index
    Created on : Aug 6, 2023, 1:44:34 PM
    Author     : yuumm
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<h2 class="text-center">Thống kê người dùng</h2>
<div class="row align-items-center">
    <div class="col-12 col-md-6 d-flex flex-wrap align-items-center">
        <p class="col-12 col-md-3 mt-3">
            Chọn năm
        </p>
        <div class="ms-auto col-12 col-md-3 mt-3">
            <select class="form-select" id="monthYearSelect" onchange="updateMonthChart()">
                <c:forEach var="year" begin="${currentYear - 10}" end="${currentYear}">
                    <option value="${year}" <c:if test="${year eq currentYear}">selected</c:if>>${year}</option>
                </c:forEach>
            </select>
        </div>
        <canvas id="monthChart" class="m-2 col-12"></canvas>
        <p class="text-center col-12">Thống kê theo tháng</p>
    </div>
    <div class="col-12 col-md-6 d-flex flex-wrap align-items-center mt-2">
        <p class="col-12 col-md-3 mt-3">
            Chọn năm
        </p>
        <div class="ms-auto col-12 col-md-3 mt-3">
            <select class="form-select" id="quarterYearSelect" onchange="updateQuarterChart()">
                <c:forEach var="year" begin="${currentYear - 10}" end="${currentYear}">
                    <option value="${year}" <c:if test="${year eq currentYear}">selected</c:if>>${year}</option>
                </c:forEach>
            </select>
        </div>
        <canvas id="quarterChart" class="m-2 col-12"></canvas>
        <p class="text-center col-12">Thống kê theo quý</p>
    </div>
    <div class="col-12 d-flex flex-wrap align-items-center mt-2">
        <canvas id="yearChart" class="m-2 col-12"></canvas>
        <p class="text-center col-12">Thống kê theo năm</p>
    </div>
</div>


