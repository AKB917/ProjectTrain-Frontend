const searchTrips = () => {
  const departureEntered =
    document.querySelector("#departure").value || "Paris";

  const arrivalEntered =
    document.querySelector("#arrival").value || "Marseille";

  const dateEntered = document.querySelector("#date").value || "2025-01-31";

  const url = `http://localhost:3000/home/trips?departure=${departureEntered}&arrival=${arrivalEntered}&date=${dateEntered}`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((tripRecieved) => {
      console.log("tripRecieved = ", tripRecieved);
      if (!tripRecieved.result) {
        document.querySelector("#results").innerHTML = `
               <img class="rightIcon" src="./images/notfound.png" />
            <div id="greenSeparator"></div>
            <h5>No trip found.</h5>
            `;
      } else {
        document.querySelector("#results").innerHTML = ``;
        for (let oneTrip of tripRecieved.trips) {
          document.querySelector("#results").innerHTML += `
               <div class="oneResult">
            <p>${oneTrip.departure} > ${oneTrip.arrival}</p>
            <p>${oneTrip.time}</p>
            <p>${oneTrip.price}€</p>
            <button class="bookButton" id=${oneTrip._id}>Book</button>
          </div>`;
        }
        addListenerBooking();
      }
    });
};

document.querySelector("#searchButton").addEventListener("click", () => {
  console.log("Button clicked");
  searchTrips();
});

const addListenerBooking = () => {
  console.log("begin scan");
  document.querySelectorAll(".bookButton").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("click, button.id = ", button.id);
      fetch(`http://localhost:3000/carts/add/${button.id}`, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          console.log("Sucess BOOKING, data = ", data);
        });
    });
  });
};
