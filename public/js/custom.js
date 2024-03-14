function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let image = document.getElementById("imagePlaceholder");
      image.style.display = "block";
      image.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function image(url) {
  console.log(url);
  let image = document.getElementById("image");
  image.style.display = "block";
  image.src = url.src;
}
