describe("book seats", () => {
  const seats = require("../fixtures/seats.json");
  beforeEach(() => {
    cy.visit("qamid.tmweb.ru");
  });

  it("Should book tickets", () => {
    const logopass = require("../fixtures/logopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${logopass.email}`, `${logopass.password}`);
    });
    cy.get(".page-nav__day").should("have.length", 7).should("be.visible");
    cy.get("a.page-nav__day:nth-of-type(4)").click();
    cy.get(".movie").first().contains("10:00").click();
    cy.bookTickets(0);
    cy.contains("Вы выбрали билеты:").should("be.visible");
  });

  it("Should not book tickets", () => {
    const logopass = require("../fixtures/logopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${logopass.email}`, `${logopass.password}`);
    });
    cy.get(".page-nav__day").should("have.length", 7).should("be.visible");
    cy.get("a.page-nav__day:nth-of-type(4)").click();
    cy.get(".movie").first().contains("10:00").click();
    cy.bookTickets(0);
    cy.contains("Электронный билет").should("be.visible");
  });
});
