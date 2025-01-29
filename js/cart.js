console.log("hello cart");

const fetchCart = () => {
  fetch("http://localhost:3000/carts/")
    .then((response) => response.json())
    .then((data) => {
      console.log('"data = ', data);
      if (data.result) {
        console.log("if");
        document.querySelector(
          ".whiteRectangle"
        ).innerHTML = `<div id="myCart">My cart</div>`;

        data.trips.forEach((element) => {
          console.log("element =", element);
          document.querySelector(
            ".whiteRectangle"
          ).innerHTML += `<div class="oneTrip">
          <h4>${element.departure} > ${element.arrival}</h4>
          <h4>${element.time}</h4>
          <h4>${element.price}€</h4>
          <button class="deleteButton" id=${element.id}>X</button>
        </div>`;
        });

        document.querySelector(
          ".whiteRectangle"
        ).innerHTML += `        <div id="blueBar">
        <h4 id="total">Total: ${data.totalPrice}€</h4>
        <button id="purchase">Purchase</button>
      </div>`;

        addListenerDelete();
      } else {
        document.querySelector(
          ".whiteRectangle"
        ).innerHTML = `        <h3>No tickets in your cart.</h3>
        <h3>Why not plan a trip ?</h3>`;
      }
    })
    .then(() => listenerOnPurchase());
};

fetchCart();

const addListenerDelete = () => {
  console.log("begin scan");
  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click, button.id = ", button);
      fetch(`http://localhost:3000/carts/del/${button.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Sucess DELETE, data = ", data);
          fetchCart();
        });
    });
  });
};

const purchaseAll = () => {
  console.log();
};

console.log("HELLO");

const listenerOnPurchase = () => {
  document.querySelector("#purchase").addEventListener("click", () => {
    fetch(`http://localhost:3000/bookings/add`, { method: "POST" });
    window.location.href = "bookings.html";
  });
};
