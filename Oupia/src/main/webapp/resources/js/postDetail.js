function getMotels(obj, path, motelId) {
    hideLabel();
    const userId = obj.value;
    const motelInput = document.querySelector("#motelInput");
    let innerHTML = "<option disabled selected></option>";
    let apiPath = path + "?status=ACCEPTED&userId=" + userId;
    fetch(apiPath, {
        methods: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        data.forEach(motel => {
            innerHTML += `<option value="${motel.id}">${motel.name}</option>`
        });
        motelInput.innerHTML = innerHTML;
        if (motelId != null)
            motelInput.value = motelId
    });
}

function submitForm() {
    document.querySelector("form").submit();
}
function hideLabel() {
    const input = document.querySelector("#labelOwner");
    if (input)
        input.classList.add("d-none");
}

function hideLabelMotel() {
    const input = document.querySelector("#labelMotel");
    if (input)
        input.classList.add("d-none");
}

function removeImg(obj) {
    obj.parentElement.remove()
}