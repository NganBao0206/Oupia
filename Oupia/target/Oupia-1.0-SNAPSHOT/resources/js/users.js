/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function delUser(path) {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?") == true) {
        fetch(path, {
            method: "DELETE"
        }).then(res => {
            if (res.status == 204) {
                location.reload();
            }
            else {
                alert("Đã có lỗi xảy ra");
            }
        });
    }
}

function destroyUser(path) {
    if (confirm("Bạn có chắc chắn muốn vĩnh viễn người dùng này không?") == true) {
        fetch(path, {
            method: "DELETE"
        }).then(res => {
            if (res.status == 204) {
                location.reload();
            }
            else {
                alert("Đã có lỗi xảy ra");
            }
        });
    }
}

function restoreUser(path) {
    if (confirm("Bạn có chắc chắn muốn phục hồi người dùng này không?") == true) {
        fetch(path, {
            method: "PATCH"
        }).then(res => {
            if (res.status == 200) {
                location.reload();
            }
            else {
                alert("Đã có lỗi xảy ra");
            }
        });
    }
}


