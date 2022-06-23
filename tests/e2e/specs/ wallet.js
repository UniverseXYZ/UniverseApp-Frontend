/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Wallet operations", () => {
  describe("Deny sign in", () => {
    it("Deny sign in with Metamask", () => {
      cy.visit("");

      cy.get("button.sign__in").should("be.visible").click();
      cy.get("div.wallets")
        .should("be.visible")
        .get("img[alt='Metamask']")
        .click();

      // if this is the first test running on fresh synpress browser we need to acceptMetamaskAccess
      cy.acceptMetamaskAccess();

      cy.rejectMetamaskSignatureRequest();

      // check if the "Wrong network" modal is visible
      cy.get("div[class='wrong__network__popup']")
        .should("be.visible")
        .contains("Signature is required")
        .should("be.visible");

      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });

  describe("Sign in with wrong network", () => {
    it("Should NOT sign in with Metamask wrong network", () => {
      cy.visit("");

      // Try sign in with Ropsten network
      cy.changeMetamaskNetwork("ropsten");
      cy.get("button.sign__in").should("be.visible").click();
      cy.get("div.wallets")
        .should("be.visible")
        .get("img[alt='Metamask']")
        .click();

      // if this is the first test running on fresh synpress browser we need to acceptMetamaskAccess
      // cy.acceptMetamaskAccess();

      // check if the "Wrong network" modal is visible
      cy.get("div[class='wrong__network__popup']")
        .should("be.visible")
        .find("img[class='close__popup']")
        .click();
      cy.changeMetamaskNetwork(process.env.NETWORK_NAME);
      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });

  describe("Sign in", () => {
    it("Should sign in with Metamask", () => {
      cy.visit("");

      const shouldAcceptAccess = false;
      AppTest.signInWithMetamask(shouldAcceptAccess);
      // Checks that My Account button has appeared
      cy.get("button").contains("My account").should("be.visible");
      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });
});

// cy.fetchMetamaskWalletAddress().then((address)=>{
//   console.log(address)
// });
