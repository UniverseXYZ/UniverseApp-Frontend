/// <reference types="cypress" />
import { AppTest } from "../utils/app";

xdescribe("Wallet operations", () => {
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
      cy.acceptMetamaskAccess();

      // check if the "Wrong network" modal is visible
      cy.get("div[class='wrong__network__popup']")
        .should("be.visible")
        .find("img[class='close__popup']")
        .click();
      cy.changeMetamaskNetwork(process.env.NETWORK_NAME);
      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });

  describe("Deny sign in", () => {
    it("Deny sign in with Metamask", () => {
      cy.visit("");

      cy.get("button.sign__in").should("be.visible").click();
      cy.get("div.wallets")
        .should("be.visible")
        .get("img[alt='Metamask']")
        .click();

      // if this is the first test running on fresh synpress browser we need to acceptMetamaskAccess
      //cy.acceptMetamaskAccess();

      cy.rejectMetamaskSignatureRequest();

      // check if the "Wrong network" modal is visible
      cy.get("div[class='wrong__network__popup']")
        .should("be.visible")
        .contains("Signature is required")
        .should("be.visible");

      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });

  describe("Sign in", () => {
    it("Should sign in with Metamask", () => {
      cy.visit("");

      const shouldAcceptAccess = false;
      AppTest.signInWithMetamask(shouldAcceptAccess);
      // Checks that My Account button has appeared
      cy.get("button.myAccount").should("be.visible");
      cy.disconnectMetamaskWalletFromAllDapps();
    });
  });
});

describe("Minting Page", () => {
  const navigateToMintFromNavBarLink = () => {
    // Check that Products is visible in Nav bar
    cy.get("[class=nav__link__title]")
      .contains("Products")
      .should("be.visible");

    // click the Minting btn from dropdown, to go to minting page
    cy.get('div[class="dropdown minting-drop"]')
      .contains("Minting")
      .click({ force: true });
  };
  const requireSignInToMint = () => {
    // check if modal for connecting wallet pops up if user is not signed in
    cy.get("[class=wrong__network__popup]")
      .contains("Oops")
      .should("be.visible");

    // check if btn "Sign in" is visible
    cy.get("[class=wrong__network__popup]")
      .contains("Sign in")
      .should("be.visible")
      .click({ force: true });

    // check if modal for wallet connection pops up
    cy.get("[class=select_wallet__popup]")
      .contains("Select Wallet")
      .should("be.visible");

    // close the popup
    cy.get("img[alt=Close]").should("be.visible").click({ force: true });
  };

  xdescribe("Mint NFT", () => {
    it("Should navigate to minting page and require SignIn", () => {
      cy.visit("");
      navigateToMintFromNavBarLink();
      // find and click the Create NFT box
      cy.get("div[class='single-box']")
        .contains("Create NFT")
        .should("be.visible")
        .click({ force: true });

      requireSignInToMint();
    });

    it("Should fill in Create NFT form", () => {
      cy.visit("");

      const shouldAcceptAccess = false; // true if only this test is runing
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
        .attachFile("image1.png");

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

  describe("Create Collection", () => {
    xit("Should navigate to minting page and require SignIn", () => {
      cy.visit("");
      navigateToMintFromNavBarLink();
      // find and click the Create NFT box
      cy.get("div[class='single-box']")
        .contains("Create Collection")
        .should("be.visible")
        .click({ force: true });

      requireSignInToMint();
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
      cy.get("button.myAccount").should("be.visible");
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
        .attachFile("image1.png");

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
});
// cy.fetchMetamaskWalletAddress().then((address)=>{
//   console.log(address)
// });
