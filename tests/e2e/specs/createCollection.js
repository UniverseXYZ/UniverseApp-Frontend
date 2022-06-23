/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Create Collection", () => {
  it("Should navigate to minting page and require SignIn", () => {
    cy.visit("");
    AppTest.navigateToMintFromNavBarLink();
    // find and click the Create NFT box
    cy.get("div[class='single-box']")
      .contains("Create Collection")
      .should("be.visible")
      .click({ force: true });

    AppTest.requireSignInToMint();
    cy.disconnectMetamaskWalletFromAllDapps();
  });

  it("Should fill in Create Collection form", () => {
    const getCollectionNameInput = () => {
      return cy.get("div[class='collection--name']").find("input");
    };

    const getTokenNameInput = () => {
      return cy.get("div[class='collection--token']").find("input");
    };

    cy.visit("");

    const shouldAcceptAccess = true; // true if only this test is runing
    AppTest.signInWithMetamask(shouldAcceptAccess);

    // Checks that My Account button has appeared
    cy.get("button").contains("My account").should("be.visible");
    cy.visit("/minting");

    // find and click the Create Collection box
    cy.get("div[class='single-box']")
      .contains("Create Collection")
      .should("be.visible")
      .click({ force: true });

    // check if btn "Create collection" is disabled
    cy.get("div[class='create--collection--btn']")
      .find("button")
      .should("be.disabled");

    // add COLLECTION name and TOKEN name
    getCollectionNameInput().type("Test collection", { force: true });
    getTokenNameInput().type("TST", { force: true });

    // add Description
    cy.get("div[class='collection--description']")
      .find("textarea")
      .type("Test the description", { force: true });

    // check if btn "Create collection" is enabled
    cy.get("div[class='create--collection--btn']")
      .find("button")
      .scrollIntoView()
      .should("not.be.disabled");

    // --- check for correct form errors ---
    // click the button so we can get the "Cover image" error
    cy.get("div[class='create--collection--btn']")
      .find("button")
      .click({ force: true });
    cy.get("p[class='error-message']")
      .contains("File format must be PNG, JPEG, GIF (Max Size: 1mb)")
      .scrollIntoView()
      .should("be.visible");

    // delete inputs from collection and token so we can get the errors
    getCollectionNameInput().clear({ force: true });
    getTokenNameInput().clear({ force: true });

    cy.get("p[class='error-message']")
      .contains("“Collection name” is not allowed to be empty")
      .scrollIntoView()
      .should("be.visible");
    cy.get("p[class='error-message']")
      .contains("“Token name” is not allowed to be empty")
      .scrollIntoView()
      .should("be.visible");

    // Again add COLLECTION name and TOKEN name
    getCollectionNameInput().type("Test collection", { force: true });
    getTokenNameInput().type("TST", { force: true });

    // --- social links ---
    // add website
    cy.get("div[class='social--links--item']")
      .find("input[placeholder='yoursite.io']")
      .type("google.com", { force: true });

    // add discord
    cy.get("div[class='social--links--item']")
      .find("input[placeholder='yourdiscord']")
      .type("discord_user", { force: true });

    // add instagram
    cy.get("div[class='social--links--item']")
      .find("input[placeholder='yourinstagram']")
      .type("instagram_user", { force: true });

    // add medium
    cy.get("div[class='social--links--item']")
      .find("input[placeholder='yourmedium']")
      .type("medium_user", { force: true });

    // add telegram
    cy.get("div[class='social--links--item']")
      .find("input[placeholder='yourtelegram']")
      .type("telegram_user", { force: true });

    // add cover image
    cy.get("div[class='image--not--selected ']")
      .find("input")
      .attachFile("img_800x800.png");

    // check if btn "Create collection" is enabled
    cy.get("div[class='create--collection--btn']")
      .find("button")
      .scrollIntoView()
      .should("not.be.disabled")
      .click({ force: true });

    // assure loading popup is visilble
    cy.get("div[id='loading-popup-div']").should("be.visible");
    AppTest.confirmMetamaskTransaction();

    // assure loading popup has been updated with "Transaction hash"
    cy.get("div[id='loading-popup-div']")
      .contains("Transaction hash")
      .should("be.visible");

    // assure "Congratulations" text is visible
    cy.get("div[class='popup-div congrats-popup']")
      .contains("Congratulations!")
      .should("be.visible");

    // click the btn "Go to my Collections"
    cy.get("div[class='popup-div congrats-popup']")
      .find("button")
      .contains("Go to my Collections")
      .click({ force: true });

    cy.get("div[class='container mynfts__page__header']")
      .contains("My NFTs")
      .scrollIntoView()
      .should("be.visible");
  });
});
