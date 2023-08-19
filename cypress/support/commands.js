Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://qamid.tmweb.ru/admin/");
  if (email) {
    cy.get('[for="email"] > .login__input').focus().clear().type(email);
  }
  if (password) {
    cy.get('[for="pwd"] > .login__input').type(password);
  }
  cy.contains("Авторизоваться").click();
});

Cypress.Commands.add("getMovie", (index) => {
  const logopass = require("../fixtures/logopass.json");
  logopass.forEach((logopass) => {
    cy.login(`${logopass.email}`, `${logopass.password}`);
  });
  cy.get("conf-step__movie-title"(index));
});

Cypress.Commands.add("bookTickets", (index) => {
  cy.visit("qamid.tmweb.ru");
  const seats = require("../fixtures/seats.json");
  cy.getMovie(0);
  cy.get("a.page-nav__day:nth-of-type(4)").click();
  cy.get(".movie").first().contains("10:00").click();
  //const seats = require("../fixtures/seats.json");
  seats.forEach((seat) => {
    cy.get(
      `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
    ).click();
  });
  cy.get(".acceptin-button").click();
  cy.get(".acceptin-button").click();
  cy.contains("Получить код бронирования").click();
});
