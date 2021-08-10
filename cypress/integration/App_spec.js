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

  it("Should display the information retrieved from the api", () => {
    cy.get("[data-cy=orderCard]")
      .should("have.length", "1")
  })

})