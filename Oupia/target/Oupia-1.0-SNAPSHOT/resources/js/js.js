/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            let imgAvatar = document.querySelector("#imgAvatar");
            imgAvatar.src = e.target.result;
            imgAvatar.classList.remove("d-none");
            document.querySelector("#hiddenAvatar").classList.add("d-none");
        };

        reader.readAsDataURL(input.files[0]);
    }
}