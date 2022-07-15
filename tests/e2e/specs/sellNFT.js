/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Sell NFT", () => {

  const pickDate = () => {
    cy.get("span").contains("Select date...").click({ force: true });
    cy.get(".react-datepicker__day--today").click({ force: true });
    cy.get(".chakra-modal__footer").contains("Save").click({ force: true });
  };

  const addWallet = () => {
    cy.get("div").contains("Add Wallet").click({ force: true });
  };



  const clickOnERC = () => {
    cy.get("p").contains("ERC-721").should("be.visible").click({ force: true });
  };

  it("should sell", () => {
    cy.visit("");
    AppTest.signInWithMetamask(true);

    cy.visit("/my-nfts/");
    // click on the first nft
    clickOnERC();

    // click the "Put on sale" btn
    cy.get("div")
      .contains("Put on sale")
      .should("be.visible")
      .click({ force: true });

    cy.get("div")
      .contains("Fixed Listing")
      .should("be.visible")
      .click({ force: true });

    // type in price
    cy.get("input[placeholder='Amount']").type("0.01", { force: true });

    // pick some dates for the NFT sale
    pickDate();
    pickDate();

    // get current metamask wallet and use it for royalties
    cy.fetchMetamaskWalletAddress().then((address) => {
      AppTest.fillRoyalties(address, "0");
    });

    // adds a wallet for the royalty split
    addWallet();
    // add random wallet
    AppTest.fillRoyalties(AppTest.dummyAddress_1, "1");

    // check if "Continue" button is active and click it
    cy.get("button")
      .contains("Continue")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });

    // @TODO: Crete a sequence to Approve collections for sale if the collection is not approved

    // check if "Post your listing" button is active and click it
    cy.get("button")
      .contains("Post your listing")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });

    cy.confirmMetamaskDataSignatureRequest();

    // check for successful listing
    cy.get("h2").contains("Congratulations!").should("be.visible");

    // find "View listing" button and ckeck for availability
    cy.get("button")
      .contains("View listing")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });


    // we need to wait some time so that the listing
    // goes on sale (takes ~60 seconds total)
    cy.wait(20000);
    cy.visit("/my-nfts/");

    // click on the nft
    clickOnERC();

    // @TODO: Add a change price sequence when we are unblocked
    // change price is canceling the listing
    // find "Change price" button and ckeck for availability
    //   cy.get("button")
    //     .contains("Change price")
    //     .should("be.visible")
    //     .should("not.be.disabled")
    //     .click({ force: true });

    // find "Cancel listing" button and ckeck for availability
    cy.get("button[data-cy='cancel-listing-button']")
      .should("be.visible")
      .click({ force: true });

    // confirm "Cancel listing"
    cy.get("div[class='chakra-portal']")
      // .find("button")
      .contains("Cancel listing")
      .should("be.visible")
      .should("not.be.disabled")
      .click({ force: true });

    AppTest.confirmMetamaskTransaction();

    cy.get("h2")
      .contains("Please wait for the transaction to complete ...")
      .should("be.visible");
  });


});
