const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhY2VjNTk2OGRlNTAwMTU1MmEzYzEiLCJpYXQiOjE3NTA3ODE2MzcsImV4cCI6MTc1MTk5MTIzN30.oq7xnSM3aDeQHx_-hTEtLwzUaRg9DsFLQUXK3aaQtxw";

//Step 1: all'avvio dell'homepage, carica e mostra tutte le card prodotto; quando un user scrive un titolo, filtra i prodotti gia' scaricati e aggiorna le card

//Crea una variabile globale per salvare tutti i prodotti
let allProducts = []; // contiene tutti i prodotti una volta caricati. Let invece di const perche' i risultati variano.

//Fetch iniziale: salvi i dati e mostri tutte le card prodotto
function fetchProducts() {
  //usa il fetch per chiamare l'API, con endpoint product - porta di accesso
  fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      allProducts = data; //salva tutti i prodotti nell'array
      displayProducts(allProducts); //funzione per mostrare tutto all'inizio
    })
    .catch((error) => {
      console.error("Errore nella fetch:", error);
    });
}

function displayProducts(productsArray) {
  const cardsContainer = document.getElementById("cardsContainer"); //prendo l'elemento del div dove inserire le card
  cardsContainer.innerHTML = ""; //pulisce il container dal contenuto precedente

  productsArray.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = product.img;
    img.alt = product.alt;
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.title;
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = `Price: ${product.price}`;
    cardBody.appendChild(cardText);

    const cardLink = document.createElement("a");
    cardLink.className = "btn btn-success";
    cardLink.href = "#";
    cardLink.textContent = "Prouct details";
    cardLink.setAttribute("id", "productId");
    cardLink.dataset.productId = "_id"; //id del prodotto nell'array?
    cardBody.appendChild(cardLink);

    card.appendChild(cardBody);
    col.appendChild(card);
    cardsContainer.appendChild(col); // Qui aggiungiamo la colonna alla griglia
  });
}

function searchProduct(event) {
  event.preventDefault(); //previene il refresh della pagina
  let prodotto = searchInput.value.toLowerCase().trim();
  console.log(prodotto);
  if (!prodotto) {
    displayProducts(allProducts); //se il campo e' vuoto, mostriamo tutti i libri
    return alert("Please enter a valid product name.");
  }
  let filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(prodotto)
  );

  displayProducts(filteredProducts); //mostra solo i risultati trovati
}

searchButton.addEventListener("click", searchProduct);

fetchProducts(); //Alla fine del codice, carica tutti i prodotti all'inizio in questo modo.
