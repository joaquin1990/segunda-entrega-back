// ---------------------------------------------
let productForm = document.getElementById("productsForm");
const handleSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  fetch(route, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
productForm.addEventListener("submit", (e) =>
  handleSubmit(e, e.target, "/api/products")
);
// ---------------------------------------------
let addForm = document.getElementById("addForm");
const addSubmit = (evt, form, route) => {
  evt.preventDefault();
  console.log("hola");
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  let id = obj["add"];
  fetch(route + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
addForm.addEventListener("submit", (e) => {
  addSubmit(e, e.target, `/api/products`);
});
// ---------------------------------------------
let deleteForm = document.getElementById("deleteForm");
const deleteSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  let id = obj["delete"];
  fetch(route + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
deleteForm.addEventListener("submit", (e) => {
  deleteSubmit(e, e.target, `/api/products`);
});
// ---------------------------------------------
let actualizarForm = document.getElementById("updateForm");
const actualizarSubmit = (evt, form, route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  let id = obj["id"];
  fetch(route + "/" + id, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
actualizarForm.addEventListener("submit", (e) =>
  actualizarSubmit(e, e.target, "/api/products")
);
