<%-- 
    Document   : email
    Created on : Sep 9, 2023, 11:25:18 PM
    Author     : yuu
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>    <tiles:insertAttribute name="title" /></title>
    </head>
    <body>
        <h1>Email Confirmation</h1>
        <tiles:insertAttribute name="content" />
        <tiles:insertAttribute name="footer" />
    </body>
</html>

