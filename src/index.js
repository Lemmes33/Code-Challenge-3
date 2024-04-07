document.addEventListener("DOMContentLoaded", () => {
  const poster = document.getElementById("poster");
  const title = document.getElementById("title");
  const runtime = document.getElementById("runtime");
  const description = document.getElementById("film-info");
  const showtime = document.getElementById("showtime");
  const remainingTickets = document.getElementById("ticket-num");
  const ul = document.getElementById("films");

  function showCaseDetails(id) {
    fetch(`http://localhost:3000/films/${id}`) // Added backticks to enclose URL
      .then((response) => response.json())
      .then((data) => {
        filmDetails(data);
      })
      .catch((error) => console.error(error));
  }

  function filmDetails(data) {
    poster.src = data.poster;
    title.textContent = data.title;
    runtime.textContent = `${data.runtime} minutes;`; // Added "minutes" suffix
    showtime.textContent = data.showtime;
    description.textContent = data.description;
    const availableTickets = data.capacity - data.tickets_sold;
    remainingTickets.textContent = availableTickets;
  }

  function moviesList() {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((film) => createMovieList(film));
      })
      .catch((error) => console.error(error));
  }

  function createMovieList(data) {
    const list = document.createElement("li");
    list.textContent = data.title;
    list.className = "menu";
    list.setAttribute("data-id", data.id);
    ul.appendChild(list);
  }

  showCaseDetails(1);
  moviesList();
  const buyBtn = document.getElementById("buy-ticket");
  const ticketSold = data.tickets_sold + 1;
  function buyTicket(id) {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        if (availableTickets !== 0 && availableTickets > 0) {
          updatedTickets(id, ticketSold);
        } else {
          buyBtn.textContent = "sold out";
        }
      });
  }
  function updatedTickets(id, ticketSold) {
    fetch(`http://localhost:3000/films/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tickets_sold: ticketSold,
      }),
    })
      .then(() => {
        showRemainingTickets(id);
      })
      .catch((error) => console.error("Error:", error));
  }
  function showRemainingTickets() {
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        remainingTickets.textContent = data.capacity-data.tickets_sold
      })
      .catch((error) => console.error("Error:", error));
  }
  buyBtn.addEventListener("click", () => {
    // const filmId = document.querySelector(".menu.selected").getAttribute("data-id");
    // buyTicket(filmId);
    buyTicket()
  });
});
