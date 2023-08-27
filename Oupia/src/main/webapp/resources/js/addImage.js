function addImage(obj) {
    if (obj.files && obj.files.length > 0) {
        const container = document.querySelector("#imgsImport")
        container.innerHTML = "";
        for (let i = 0; i < obj.files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgSrc = e.target.result; // Lưu trữ giá trị src
                const lastChild = container.lastElementChild;

                const newHtml = `<div class="position-relative m-1">
                                    <img style="width:200px; height:150px; object-fit: cover;" class="rounded-3" src="${imgSrc}"/>
                                 </div>`;


                // Insert the HTML content after the lastChild
                if (lastChild)
                    lastChild.insertAdjacentHTML("afterend", newHtml);
                else
                    container.innerHTML = newHtml;
            };


            reader.readAsDataURL(obj.files[i]);
        }
    }
}