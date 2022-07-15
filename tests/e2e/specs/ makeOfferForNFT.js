/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Make offer", () => {
  it("should make offer for NFT", () => {
    cy.visit("");
    AppTest.signInWithMetamask(true);

    cy.get("a.chakra-linkbox__overlay")
      .find("p.chakra-text")
      .contains("testing name")
      .should("be.visible")
      .click({ force: true });

    cy.get("div")
      .contains("Make offer")
      .should("not.be.disabled")
      .should("be.visible")
      .click({ force: true });

    cy.get("input[name='price']").type("0.0001", { force: true });
    cy.fetchMetamaskWalletAddress().then((address) => {
      AppTest.fillRoyalties(address, "0");
    });

    cy.get("p.chakra-text")
      .contains("Add Wallet")
      .should("be.visible")
      .click({ force: true });
    AppTest.fillRoyalties(AppTest.dummyAddress_1, "1");

    cy.get("footer.chakra-modal__footer")
      .contains("Make an Offer")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });

    cy.get("div.chakra-modal__body").should("be.visible");

    cy.confirmMetamaskDataSignatureRequest()
    cy.confirmMetamaskSignatureRequest()

    // @TODO: Finish up the sequence for makeing offer.
    // We are blocked after signing the metamask conformations.

    // @TODO: Raise offer with different wallet

    // @TODO: Accept offer

  });
});
