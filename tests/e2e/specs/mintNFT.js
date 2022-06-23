/// <reference types="cypress" />
import { AppTest } from "../utils/app";

describe("Mint NFT", () => {
  it("Should navigate to minting page and require SignIn", () => {
    cy.visit("");
    AppTest.navigateToMintFromNavBarLink();
    // find and click the Create NFT box
    cy.get("div[class='single-box']")
      .contains("Create NFT")
      .should("be.visible")
      .click({ force: true });

    AppTest.requireSignInToMint();
    cy.disconnectMetamaskWalletFromAllDapps();
  });

  it("Should fill in Create NFT form", () => {
    cy.visit("");

    const shouldAcceptAccess = true; // true if only this test is runing
    AppTest.signInWithMetamask(shouldAcceptAccess);

    cy.visit("/minting");

    // find and click the Create NFT box
    cy.get("div[class='single-box']")
      .contains("Create NFT")
      .should("be.visible")
      .click({ force: true });

    // get the 'Name' field and write
    cy.get('input[placeholder="Enter NFT name"]')
      .should("be.visible")
      .type("Test", { force: true });

    // get the 'Description' field and write
    cy.get('textarea[placeholder="Spread some words about your NFT"]')
      .should("be.visible")
      .type("Test all the things", { force: true });

    // get the 'Number of editions' field and write
    cy.get('input[placeholder="Enter Number of Editions"]')
      .should("be.visible")
      .scrollIntoView()
      .type("1", { force: true })
      .clear();

    cy.get('input[placeholder="Enter Number of Editions"]').type("1", {
      force: true,
    });

    // Asure that "Universe Singularity" collection is chosen
    cy.get('[class="choose__collection"]')
      .eq(0)
      .find('img[class="check__icon"]')
      .should("be.visible");

    // enable "Properties" by clicking the slider btn
    cy.get('div[class="single-nft-properties-header"]')
      .should("be.visible")
      .find('input[type="checkbox"]')
      .click({ force: true });

    // add first "Property type"
    cy.get('[class="property-name"')
      .eq(0)
      .find("input")
      .type("test", { force: true });

    // add first "Property name"
    cy.get('[class="property-value"')
      .eq(0)
      .find("input")
      .type("yes", { force: true });

    // add 2rd property
    cy.get('[class="property-add"]')
      .contains("Add property")
      .click({ force: true });

    cy.get('[class="property-name"')
      .eq(1)
      .find("input")
      .type("test2", { force: true });

    //class="property-value"
    cy.get('[class="property-value"')
      .eq(1)
      .find("input")
      .type("yes2", { force: true });

    // add 3rd property
    cy.get('[class="property-add"]')
      .contains("Add property")
      .click({ force: true });

    // delete 3rd property
    cy.get('[class="properties"]')
      .eq(2)
      .find('[class="delete-img"]')
      .click({ force: true });

    // disable "Revenue splits" by clicking the slider btn
    cy.get('div[class="royalities"]')
      .find('input[type="checkbox"]')
      .click({ force: true });

    // check if "Revenue splits" is disabled
    cy.get('div[class="royalities"]')
      .scrollIntoView()
      .contains("Add wallet")
      .should("not.exist");

    // check if "Revenue splits"  is disabled
    cy.get('div[class="single-nft-content"]')
      .contains("Wallet address")
      .should("not.exist");

    // enable "Revenue splits" by clicking the slider btn
    cy.get('div[class="royalities"]')
      .find('input[type="checkbox"]')
      .click({ force: true });

    // add more wallets
    cy.get('div[class="royalities"]')
      .contains("Add wallet")
      .click({ force: true });

    // check if "Revenue splits" is enabled
    cy.get('div[class="royalities"]')
      .scrollIntoView()
      .contains("Add wallet")
      .should("be.visible");

    // get the default address and assure it is correct
    cy.get('div[class="property-address"]')
      .eq(0) // get first input field for "Wallet address"
      .find("input")
      .should("be.visible")
      .then(($address) => {
        let address = $address.val();
        cy.fetchMetamaskWalletAddress().then((metamaskAddress) => {
          expect(address.toLowerCase()).to.eq(metamaskAddress.toLowerCase());
        });
      });

    cy.get('div[class="property-address"]')
      .eq(1) // get second input field for "Wallet address"
      .find("input")
      .type("0x24864538E54c45Cd483CeC3ced3175BA033B39dc", { force: true });

    // add second split
    cy.get('div[class="property-amount"]')
      .eq(1) // get second input field for "Percent amount"
      .find("input")
      .type("5", { force: true });

    // add cover image
    cy.get("div[class='single-nft-drop-file']")
      .find("input")
      .attachFile("img_800x800.png");

    //click the mint btn
    cy.get("button")
      .contains("Mint now")
      .should("not.be.disabled")
      .click({ force: true });

    cy.get("div[id='loading-popup-div']")
      .contains("The transaction is in progress")
      .should("be.visible");

    //cy.confirmMetamaskTransaction();
    AppTest.confirmMetamaskTransaction();

    cy.get("div[class='popup-div congrats-popup']")
      .contains("Congratulations!")
      .should("be.visible");

    cy.get("div[class='popup-div congrats-popup']")
      .contains("Go to my NFTs")
      .click({ force: true });

    cy.get("div[class='container mynfts__page__header']")
      .contains("My NFTs")
      .should("be.visible");
  });
});
