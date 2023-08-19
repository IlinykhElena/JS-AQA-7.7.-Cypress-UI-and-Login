describe("log in as admin", () => {
  it("Should successfully login", () => {
    const logopass = require("../fixtures/logopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${logopass.email}`, `${logopass.password}`);
    });
    cy.contains("Управление залами").should("be.visible");
  });

  it("Should not login with empty email", () => {
    const logopass = require("../fixtures/logopass.json");
    logopass.forEach((logopass) => {
      cy.login(null, `${logopass.password}`);
    });
    cy.get('[for="email"] > .login__input')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('[for="email"] > .login__input')
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Should not login with empty password", () => {
    const logopass = require("../fixtures/logopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${logopass.email}`, null);
    });
    cy.get('[for="pwd"] > .login__input')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('[for="pwd"] > .login__input')
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Should not login with wrong email", () => {
    const logopass = require("../fixtures/logopass.json");
    const wronglogopass = require("../fixtures/wronglogopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${wronglogopass.email}`, `${logopass.password}`);
    });
    cy.get('[for="email"] > .login__input')
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get('[for="email"] > .login__input')
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Адрес электронной почты должен содержать символ");
  });

  it("Should not login with wrong password", () => {
    const logopass = require("../fixtures/logopass.json");
    const wronglogopass = require("../fixtures/wronglogopass.json");
    logopass.forEach((logopass) => {
      cy.login(`${logopass.email}`, `${wronglogopass.password}`);
    });
    cy.get("body").should("contain", "Ошибка авторизации!");
  });
});
