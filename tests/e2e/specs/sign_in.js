describe("Sign in with Metamask Wallet", () => {
  it("Should sign in with Metamask on Desktop", () => {
    cy.visit("http://localhost:3000");

    // Get the sign in button & click
    cy.get("button.sign__in").should("be.visible").click();

    // Get the Metamask button & click
    cy.get("button.metamask-button").should("be.visible").click();

    // Give Metamask Access
    cy.acceptMetamaskAccess();

    // Confirm Metamask signature
    cy.confirmMetamaskSignatureRequest();

    // Checks that My Account button has appeared
    cy.get("button.myAccount").should("be.visible");
  });
});
