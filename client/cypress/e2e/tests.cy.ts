/// <reference types="cypress" />
describe("General e2e test for free train", () => {
  const email = "test@test.com";
  const username = "test";
  const password = "test";

  it("Register user", () => {
    cy.visit(`/`);
    cy.get("button[title=register]").click();
    cy.url().should("include", "/register");
    cy.get("input[id=email]").type(email);
    cy.get("input[id=username]").type(username);
    cy.get("input[id=password]").type(password);
    cy.get("input[id=confirmPassword]").type(password);
    cy.get("button[title=Register]").click();

    cy.url().should("include", "/mapScreen");
  });

  it("Login and use application", () => {
    cy.visit(`/`);

    cy.get("input[title=emailMain]").type(email);
    cy.get("input[title=password]").type(`${password}{enter}`);
    cy.url().should("include", "/mapScreen");

    cy.get("#map-screen").click(100, 100);
    cy.get(".add-spot-button").click();
    cy.url().should("include", "/newSpot");

    cy.get("input[id=name]").type("test");
    cy.get("textarea[id=description]").type("test");
    cy.get("input[id=uploadImage]")
      .selectFile("./cypress/testing-assets/test1.png")
      .selectFile("./cypress/testing-assets/test2.png");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/mapScreen");

    cy.get("#options a").click();
    cy.url().should("include", "/profile");

    cy.get("div[title=test] button.delete").click();
    cy.get("div.logout svg#deleteIcon").click();
    cy.get("input[type=text]").type(password);
    cy.get("button.delete").click();
    cy.url().should("include", "/");
  });
});
