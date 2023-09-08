/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function approval(path, continueApproval) {
    if (confirm("Bạn có chắc chắn muốn duyệt người dùng này không?") == true) {
        fetch(path, {
            method: "PATCH"
        }).then(res => {
            if (res.status == 200) {
                if (continueApproval) {
                    document.querySelector("#btnShow").click();
                } else {
                    location.replace("/Oupia/users");
                }
            } else {
                alert("Đã có lỗi xảy ra");
            }
        });
    }
}

function reject(path) {
    if (confirm("Bạn có chắc chắn muốn không duyệt người dùng này không?") == true) {
        fetch(path, {
            method: "PATCH"
        }).then(res => {
            if (res.status == 200) {
                location.replace("/Oupia/");
            } else {
                alert("Đã có lỗi xảy ra");
            }
        });
    }
}



