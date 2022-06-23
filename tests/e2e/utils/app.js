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

  confirmMetamaskTransaction: () => {
    // Currently without supplying a gas configuration results in failing transactions
    // Possibly caused by wrong default behaviour within Synpress
    cy.confirmMetamaskTransaction({ gasFee: 5, gasLimit: 5000000 });
  },
};
