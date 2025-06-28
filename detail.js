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
    <h2 class="">${identification.name}</h2>
    <div class="d-flex justify-content-between">
    <img src="${identification.imageUrl}" alt="${identification.alt}" width="200px" />
    <div> 
    <ul> 
    <li>Brand:${identification.brand}</li>
    <li>Product description:${identification.description}</li>
    <li>Price:${identification.price}</li>
    </ul>
    </div>
    </div> 
    `;
  } catch (e) {
    console.log(e);
  }
}

getId();
