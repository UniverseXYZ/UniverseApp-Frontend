/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable ui-testing/no-hard-wait */

export const AppTest = {
  /**
   *
   * @param {*} shouldAcceptAccess must be set to true for the first Metamask
   * interaction on new browser window
   */
  signInWithMetamask: (shouldAcceptAccess = false) => {
    cy.get("button.sign__in").should("be.visible").click();
    cy.get("div.wallets")
      .should("be.visible")
      .get("img[alt='Metamask']")
      .click();
    if (shouldAcceptAccess) {
      cy.acceptMetamaskAccess();
    }
    cy.confirmMetamaskSignatureRequest();
  },

  navigateToMintFromNavBarLink: () => {
    // Check that Products is visible in Nav bar
    cy.get("[class=nav__link__title]")
      .contains("Products")
      .should("be.visible");

    // click the Minting btn from dropdown, to go to minting page
    cy.get('div[class="dropdown minting-drop"]')
      .contains("Minting")
      .click({ force: true });
  },
  requireSignInToMint: () => {
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
  },

  confirmMetamaskTransaction: () => {
    // Currently without supplying a gas configuration results in failing transactions
    // Possibly caused by wrong default behaviour within Synpress
    cy.confirmMetamaskTransaction({ gasFee: 5, gasLimit: 5000000 });
  },
};
