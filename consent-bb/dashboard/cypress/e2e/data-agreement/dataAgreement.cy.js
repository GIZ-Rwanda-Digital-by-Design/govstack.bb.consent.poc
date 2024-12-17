/// <reference types="cypress" />

// Load fixtures
const testDataAsImport = require('../../fixtures/test-data')
const urls = require('../../fixtures/urls')


describe('Publish a data agreement', () => {
  before(function () {
    // Supply fixtures into each test using `this.testData`
    cy.fixture('test-data.json').then((testData) => {
      this.testData = testData
    });

    const loginToAdminDashboard = () => {
      // Visit dashboard login page
      cy.visit(urls.baseUrl)

      // Type the username and password
      cy.get("#username").type(testDataAsImport.username);
      cy.get("#password").type(testDataAsImport.password);

      // Click the login button
      cy.get('[data-testid="ArrowCircleRightOutlinedIcon"]').click();

      // If login is success and redirected to dashboard.
      cy.url().should('include', urls.pages.gettingStarted);
      cy.get('h6.MuiTypography-h6').contains('Consent Building Block - Admin Dashboard').should('exist');
    }

    cy.session('login', loginToAdminDashboard)
  })

  it('should publish a data agreement', function () {
    const { dataAgreement } = this.testData

    // Visit data agreement page
    cy.visit(urls.baseUrl + urls.pages.dataAgreements)

    // Click on create data agreement + button
    cy.get('[aria-label="Create Data Agreement"]').click();

    // Fill create data agreement form
    // Purpose name
    cy.get('[name="Name"]').type(dataAgreement.name);
    // Data exchange mode - DUS
    cy.get('[aria-labelledby="mui-component-select-AttributeType"]').click();
    cy.get('[data-value="data_using_service"]').click();
    // Purpose description
    cy.get('[name="Description"]').type(dataAgreement.description);
    // Lawful basis of processing
    cy.get('[aria-labelledby="mui-component-select-LawfulBasisOfProcessing"]').click();
    cy.get('[data-value="contract"]').click();

    // Data attributes
    // Attribute 1
    cy.get('[name="dataAttributes.0.attributeName"]').type(dataAgreement.dataAttributes[0].attributeName);
    cy.get('[name="dataAttributes.0.attributeDescription"]').type(dataAgreement.dataAttributes[0].attributeDescription);
    cy.get('[data-testid="AddCircleOutlineOutlinedIcon"]').eq(-1).click();

    // Attribute 2
    cy.get('[name="dataAttributes.1.attributeName"]').type(dataAgreement.dataAttributes[1].attributeName);
    cy.get('[name="dataAttributes.1.attributeDescription"]').type(dataAgreement.dataAttributes[1].attributeDescription);

    // Publish data agreement
    cy.contains('button', 'PUBLISH').click();

  })

  after(function () {
    // Click the login button
    cy.wait(3000);
    cy.get('[data-testid="DeleteOutlineOutlinedIcon"]').click();
    cy.get("#username").type("DELETE");
    cy.contains('button', 'DELETE').click();
  })

})