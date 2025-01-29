const searchTrips = () => {
  const departureEntered = document.querySelector("#departure").value;

  const arrivalEntered = document.querySelector("#arrival").value;

  const dateEntered = document.querySelector("#date").value;

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
            <button class="bookButton" id=${oneTrip.id}>Book</button>
          </div>`;
        }
      }
    });
};

document.querySelector("#searchButton").addEventListener("click", () => {
  console.log("Button clicked");
  searchTrips();
});
