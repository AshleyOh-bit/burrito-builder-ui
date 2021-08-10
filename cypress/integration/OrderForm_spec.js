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
            id: 99,
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


  
})