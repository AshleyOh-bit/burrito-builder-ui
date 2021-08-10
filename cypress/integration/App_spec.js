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


})