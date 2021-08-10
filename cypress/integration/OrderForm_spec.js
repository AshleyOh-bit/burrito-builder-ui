describe('App user flows', () => {
  beforeEach(() => {
    cy.intercept("GET", 'http://localhost:3001/api/v1/orders', 
    {
      statusCode: 200,
      body: {
        orders: [
          {
            id: 99,
            name: "Shelly",
            ingredients: [
              "green beans",
              "cheese",
              "rice"
            ]
          }
        ]
      }
    })
    cy.intercept("POST", 'http://localhost:3001/api/v1/orders', 
    {
      statusCode: 201,
      body: {
        orders: [
          {
            id: 66,
            name: "Brandon",
            ingredients: [
              "carnitas",
              "beans",
              "steak"
            ]
          }
        ]
      }
    })
    cy.visit('http://localhost:3000/')
  })

  it("Should display page title", () => {
    cy.get("h1")
      .contains("Burrito Builder")
  })

  it("Should allow the user to type in their name", () => {
    cy.get("input")
      .type("Brandon")
      .should("have.value", "Brandon")
  })

  it("Should allow the user to choose ingredients and show those ingredient in the order preview" , () => {
    cy.get("#0")
      .click()
    cy.get("p")
      .contains("Order: beans")
  })

  it("Should display a disabled submit button if there is no user name but there is an ingredient", () => {
    cy.get("#0")
      .click()
    cy.get("[data-cy=submit]")
      .should("be.disabled")
  })

  it("Should display a disabled submit button if there is a user name but no ingredients", () => {
    cy.get("input")
      .type("Brandon")
    cy.get("[data-cy=submit]")
      .should("be.disabled")
  })

  it("Should be display an enabled button if there is a user name and ingredients", () => {
    cy.get("input")
      .type("Brandon")
    cy.get("#0")
      .click()
    cy.get("[data-cy=submit]")
      .should("be.enabled")
  })
  
  it("Should be display an order card upon submission", () => {
    cy.get("input")
      .type("Brandon")
    cy.get("#0")
      .click()
    cy.get("#1")
      .click()
    cy.get("#2")
      .click()
    cy.get("[data-cy=submit]")
      .click()
    cy.get("[data-cy=orderCard]")
      .should("have.length", "2")
  })

  it("Should clear input after submitting", () => {
    cy.get("input")
      .type("Brandon")
    cy.get("#0")
      .click()
    cy.get("[data-cy=submit]")
      .click()
    cy.get("input")
      .should("have.value", "")
  })
  
  it("Should display correct information coming back from the POST", () => {
    cy.get("#66")
      .children("h3")
      .contains("Brandon")
    cy.get("#66")
      .children(".ingredients-list")
      .eq(0)
      .should("contain.text", "beans")
    cy.get("#66")
      .children(".ingredients-list")
      .eq(1)
      .should("contain.text", "carnitas")
    cy.get("#66")
      .children(".ingredients-list")
      .eq(2)
      .should("contain.text", "steak")
  })
})