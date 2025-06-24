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
      allPRoducts = data; //salva tutti i prodotti nell'array
      displayProducts(allProducts); //funzione per mostrare tutto all'inizio
    })
    .catch((error) => {
      console.error("Errore nella fetch:", error);
    });
}

fetchProducts(); //Alla fine del codice, carica tutti i prodotti all'inizio in questo modo.
