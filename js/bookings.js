console.log("Hello bookings");

fetch("http://localhost:3000/bookings/")
  .then((response) => response.json())
  .then((result) => {
    if (result.result) {
      console.log("result = ", result);
      result.trips.forEach((oneTrip) => {
        console.log("oneTrip = ", oneTrip);
        document.querySelector(
          "#insideWhiteBox"
        ).innerHTML += `    <div class="oneTrip">
          <h4>${oneTrip.departure} > ${oneTrip.arrival}</h4>
          <h4>${oneTrip.time}</h4>
          <h4>${oneTrip.price}€</h4>
          <h4>${oneTrip.depart}</h4>
        </div>`;
      });
    } else {
      document.querySelector("#insideWhiteBox").innerHTML += `    
            <h4>You have no booking for the moment</h4>
          `;
    }
  });
