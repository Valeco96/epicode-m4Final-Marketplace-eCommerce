const tableBody = document.querySelector("#table-body");
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhY2VjNTk2OGRlNTAwMTU1MmEzYzEiLCJpYXQiOjE3NTA3ODE2MzcsImV4cCI6MTc1MTk5MTIzN30.oq7xnSM3aDeQHx_-hTEtLwzUaRg9DsFLQUXK3aaQtxw";
const productName = document.querySelector("#name");
const productDescription = document.querySelector("#description");
const productBrand = document.querySelector("#brand");
const productImage = document.querySelector("#imageUrl");
const productPrice = document.querySelector("#price");
document.querySelector("#button-save").addEventListener("click", saveProduct);

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

  tr.append(tdName, tdBrand, tdImage, tdPrice);
  return tr;
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
  console.log(data);
  try {
    await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
}

fetchProduct();
