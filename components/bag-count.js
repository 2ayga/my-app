function updateBagCount() {
  let previewDataFromLs = JSON.parse(localStorage.getItem("bagdata")) || [];
  let countShowElements = document.querySelectorAll(".countShow");
  countShowElements.forEach(element => {
    element.innerText = `(${previewDataFromLs.length})`;
  });
}

updateBagCount();
