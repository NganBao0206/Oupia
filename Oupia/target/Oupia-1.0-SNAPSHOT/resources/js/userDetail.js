function submitForm() {
    document.querySelector("form").submit();
}

function showAvatar(userAvatar) {
    var imgAvatar = document.getElementById('imgAvatar');
    imgAvatar.src = userAvatar;
    imgAvatar.classList.remove('d-none');

    var hiddenAvatar = document.getElementById('hiddenAvatar');
    hiddenAvatar.classList.add('d-none');
}

const statusInput = document.querySelector("#statusInput");
function checkStatus(obj) {
    if (obj.value == "LANDLORD")
    {
        statusInput.disabled = false;
    }
    else {
        statusInput.value = 'ACCEPTED';
        statusInput.disabled = true;
    }
}