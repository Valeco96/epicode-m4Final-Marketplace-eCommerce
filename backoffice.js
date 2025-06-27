const tableBody = document.querySelector("#table-body");
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhY2VjNTk2OGRlNTAwMTU1MmEzYzEiLCJpYXQiOjE3NTA3ODE2MzcsImV4cCI6MTc1MTk5MTIzN30.oq7xnSM3aDeQHx_-hTEtLwzUaRg9DsFLQUXK3aaQtxw";
const productName = document.querySelector("#name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand");
const productImage = document.querySelector("#imageUrl");
const productPrice = document.querySelector("#price");
const input = document.querySelector("#id");
document.querySelector("#button-save").addEventListener("click", saveProduct);
const successAlert = document.querySelector("#success-alert");
const dangerAlert = document.querySelector("#danger-alert");

async function fetchProduct() {
  try {
    const result = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const data = await result.json();
    console.log(data);
    inputArray(data);
  } catch (e) {
    console.log(e);
  }
}

//funzione che dati input prende e cicla mappando l'array
function inputArray(products) {
  tableBody.innerHTML = "";
  const productTr = products.map((product) => createTableRow(product));
  console.log(productTr);
  tableBody.append(...productTr);
  //tableBody.append(productTr[0], productTr[1]);
}

function createTableRow(product) {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  tdName.innerText = product.name;

  const tdBrand = document.createElement("td");
  tdBrand.innerText = product.brand;

  const tdImage = document.createElement("td");
  tdImage.innerText = product.imageUrl;

  const tdPrice = document.createElement("td");
  tdPrice.innerText = product.price;

  const td = document.createElement("td");

  const buttonEdit = document.createElement("a");
  buttonEdit.classList.add("btn", "btn-primary", "w-100", "mb-3");
  buttonEdit.innerText = "Edit";
  //buttonEdit.addEventListener("click", () => productInput(product));
  buttonEdit.href = `editProduct.html?id=${product._id}`;
  td.appendChild(buttonEdit);

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn", "btn-danger", "w-100");
  buttonDelete.innerText = "Delete";
  buttonDelete.addEventListener("click", () => deleteProduct(product._id));
  td.appendChild(buttonDelete);

  tr.append(tdName, tdBrand, tdImage, tdPrice, td);
  return tr;
}

function productInput(product) {
  productName.value = product.name;
  productDescription.value = product.description;
  productBrand.value = product.brand;
  productImage.value = product.imageUrl;
  productPrice.value = product.price;
  input.value = product._id;
}

async function deleteProduct(productId) {
  try {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    fetchProduct();
  } catch (e) {
    console.log(e);
  }
}

async function saveProduct(e) {
  e.preventDefault();

  const data = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImage.value,
    price: productPrice.value,
  };
  let method = "POST";
  let endpoint = "https://striveschool-api.herokuapp.com/api/product/";
  if (input.value) {
    method = "PUT";
    endpoint += input.value;
  }
  console.log(data);
  try {
    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      dangerAlert.classList.remove("d-none");
      setTimeout(() => {
        dangerAlert.classList.add("d-none");
      }, 3000);
    } else {
      fetchProduct();
      successAlert.classList.remove("d-none");
      setTimeout(() => {
        successAlert.classList.add("d-none");
      }, 3000);
    }
  } catch (e) {
    dangerAlert.classList.remove("d-none");
    setTimeout(() => {
      dangerAlert.classList.add("d-none");
    }, 3000);
    console.log(e);
  }
}

fetchProduct();
