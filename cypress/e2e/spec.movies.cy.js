describe("show main page", () => {
  const seats = require("../fixtures/seats.json");
  beforeEach(() => {
    cy.visit("qamid.tmweb.ru");
  });

  it("Should show correct number of days", () => {
    cy.get(".page-nav__day").should("have.length", 7).should("be.visible");
  });

  //проверка лишь некоторых атрибутов, для примера
  it("Should show correct movies", () => {
    cy.get(".movie__info").should("have.length", 3).should("be.visible");
    cy.get(".movie__title").should("have.length", 3).should("be.visible");
    cy.get(".movie__poster").should("have.length", 3).should("be.visible");
    cy.get(".movie__description").should("have.length", 3).should("be.visible");
  });

  it("Should be possible to book", () => {
    cy.get("a.page-nav__day:nth-of-type(4)").click();
    cy.get(".movie").first().contains("10:00").click();
    const seats = require("../fixtures/seats.json");
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(".acceptin-button").click();
    cy.contains("Вы выбрали билеты:").should("be.visible");
  });
});
