const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhY2VjNTk2OGRlNTAwMTU1MmEzYzEiLCJpYXQiOjE3NTA3ODE2MzcsImV4cCI6MTc1MTk5MTIzN30.oq7xnSM3aDeQHx_-hTEtLwzUaRg9DsFLQUXK3aaQtxw";

//recupera l'id dell'indirizzo
const indirizzo = window.location.search;
const searchIndirizzo = new URLSearchParams(indirizzo);
const productId = searchIndirizzo.get(`id`);
const prodContainer = document.querySelector("#prodContainer");

//crea la chiamata per la risorsa specifica
async function getId() {
  try {
    const result = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const identification = await result.json();
    console.log(identification);

    prodContainer.innerHTML = `
    <h2 style="margin: 50px">${identification.name}</h2>
    <div style="margin-top:80px" class="d-flex justify-content-around">
    <img src="${identification.imageUrl}" alt="${identification.alt}" width="100%" style="padding: 20px;" />
    <div> 
    <ul style="list-style: none; padding-left:0px"> 
    <li style="font-size:28px"><strong>Product details</strong> </li>
    <br />
    <li style="font-size:16px"><strong>Brand:</strong> ${identification.brand}</li>
    <li style="font-size:16px"><strong>Product description:</strong> ${identification.description}</li>
    <br />
    <li style="font-size:16px"><strong>Price:</strong> ${identification.price}€</li>
    </ul>
    <button style="margin-top: 20px" class="btn btn-outline-success" onclick="cartAlert()">Add to cart</button>
    </div>
    </div> 
    `;
  } catch (e) {
    console.log(e);
  }
}

function cartAlert() {
  alert("Sorry, this function is not available yet!");
}

getId();
