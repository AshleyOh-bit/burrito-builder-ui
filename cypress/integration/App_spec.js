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
    cy.get("[data-cy=ingredients]")
      .should("have.length", "3")
      .should("be.visible")
    cy.get("#Shelly")
      .children("ul")
      .eq(0)
      .should("contain.text", "green beans")
      .should("contain.text", "cheese")
      .should("contain.text", "rice")
  })

  it("Should display an input for the user to type their name", () => {
    cy.get("input")
      .should("be.visible")
      .should("have.attr", "placeholder")
  })

  it("Should display buttons for each ingredient and to submit" , () => {
    cy.get("[data-cy=ingButton]")
      .should("have.length", "12")
  })

  it("Should display a disabled submit button on page load", () => {
    cy.get("[data-cy=submit]")
      .should("be.disabled")
  })

  it("Should review the order back to the user", () => {
    cy.get("p")
      .contains("Order: Nothing selected")
  })

})