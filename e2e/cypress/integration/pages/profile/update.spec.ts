describe("User Logins", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("JWT");
  });

  it("should prompt registration when not registered", () => {
    cy.log("Accessing site");
    cy.visit("/profile").then(() => {
      cy.getByTestId("profile-personal-name").should("contain.text", "Eva Student Åsen");
    });
    cy.getByTestId("profile-personal-link").click();
    cy.getByTestId("editUser-firstNameTextField").focus().clear().type("Newname");
    cy.getByTestId("editUser-saveButton").click();
    cy.getByTestId("editUser-successSnackbar").should("exist");
    cy.visit("/profile");
    cy.getByTestId("profile-personal-name").should("contain.text", "Newname");
  });
});
