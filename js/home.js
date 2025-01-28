console.log("Hello");

const searchTrips = () => {
  const departureEntered = document.querySelector("#departure").value;
  console.log("departureEntered = ", departureEntered);

  const arrivalEntered = document.querySelector("#arrival").value;
  console.log("arrivalEntered = ", arrivalEntered);

  const dateEntered = document.querySelector("#date").value;
  console.log("dateEntered = ", dateEntered);

  fetch("http://localhost:3000/home/trips")
    .then((response) => response.json())
    .then((tripRecieved) => {
      console.log("tripRecieved = ", tripRecieved);
    });

  const searchedData = {
    departure: departureEntered,
    arrival: arrivalEntered,
    date: dateEntered,
  };

  fetch("https://api.chucknorris.io/jokes/random", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchedData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data = ", data);
    });
};

document.querySelector("#searchButton").addEventListener("click", () => {
  console.log("Button clicked");
  searchTrips();
});
