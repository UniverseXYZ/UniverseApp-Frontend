/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Sell NFT", () => {
  const pickDate = (date) => {
    cy.get("span").contains("Select date...").click({ force: true });

    cy.get("div[class='react-datepicker']")
      .find("button")
      .eq(1)
      .click({ force: true });

    cy.get("div[class='react-datepicker__month']")
      .contains(date)
      .click({ force: true });

    cy.get("footer[class='chakra-modal__footer css-qn2e5y']")
      .contains("Save")
      .click({ force: true });
  };

  it("should sell", () => {
    cy.visit("/my-nfts/");
    AppTest.signInWithMetamask(true);

    cy.get("p").contains("ERC-721").should("be.visible").click({ force: true });

    cy.get("div")
      .contains("Put on sale")
      .should("be.visible")
      .click({ force: true });

    cy.get("div")
      .contains("Fixed Listing")
      .should("be.visible")
      .click({ force: true });

    cy.get("input[placeholder='Amount']").type("0.1", { force: true });

    pickDate("1");
    pickDate("2");
  });
});
