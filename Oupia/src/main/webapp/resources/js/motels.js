/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function delMotel(path) {
    if (confirm("Bạn có chắc chắn muốn xóa nhà trọ này không?") == true) {
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

function destroyMotel(path) {
    if (confirm("Bạn có chắc chắn muốn vĩnh viễn nhà trọ này không?") == true) {
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

function restoreMotel(path) {
    if (confirm("Bạn có chắc chắn muốn phục hồi nhà trọ này không?") == true) {
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
