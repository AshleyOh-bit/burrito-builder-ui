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
    cy.visit('http://localhost:3000/')
  })
  it("Should display page title", () => {
    cy.get("h1")
      .contains("Burrito Builder")
  })

  it("Should display the information retrieved from the api on a card", () => {
    cy.get("[data-cy=orderCard]")
      .should("have.length", "1")
  })

  it("Should display the specific information about order coming back from the api", () => {
    cy.get("[data-cy=orderCard]")
      .should("have.length", "1")
    cy.get("[data-cy=orderName]")
      .contains("Shelly")
    cy.get("[data-cy=green beans]")
      .contains("green beans")  
    cy.get("[data-cy=cheese]")
      .contains("cheese")  
    cy.get("[data-cy=rice]")
      .contains("rice")  
  })

})