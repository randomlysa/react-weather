describe('Search bar without cities', function() {
  it('loads...', function() {
    cy.visit('http://localhost:8080');
    // Expect some content in the div.
    cy.get('[data-cy=nocities').contains('No cities');
  });
});

describe('Search bar', function() {
  before(function() {
    cy.visit('http://localhost:8080');

    // Have at least one city loaded for all tests.
    cy.get('.rbt-input-main')
      .type('Ze', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 100 });
    cy.contains('Zederhaus');
  });

  it('should fetch weather & forecast using typeahead, down arrow, enter', function() {
    // If this is typed too fast, there will be a city search result with only
    // one city inside a button: <button>Boston District, England, GB</button>.
    // This is why I am checking for city name + fetched.
    cy.get('.rbt-input-main')
      .type('Boston District', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 100 });

    // Get city two
    cy.get('.rbt-input-main')
      .wait(50)
      .type('Tokyo', { delay: 80 })
      .wait(1000) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 150 });

    cy.contains('Boston District');
    cy.contains('Tokyo');
    cy.get('[data-cy=forecast]').should('exist');
  });

  it('should show a list of cities if user did not select typeahead option and pressed enter', function() {
    cy.get('.rbt-input-main')
      .wait(400)
      .type('Johan', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{enter}', { delay: 150 });
    cy.get('[data-cy=cityList--city]');

    // Get city from citylist.
    cy.wait(400); // Wait for typeahead to get some data and make a list.
    cy.get('[data-cy=cityList--city]')
      .first()
      .invoke('text')
      .then(text1 => {
        const [city] = text1.split(',');
        // text1 is the text of the first button. once it is clicked,
        // there should be `${city}` on the page.
        // Note, this currently also depends on there not being another
        // city with this name already on the page.
        // But I think it's also important to test this by itself AND
        // with a search having been run before it.
        cy.get('[data-cy=cityList--city]')
          .first()
          .click();
        cy.contains(`${city}`);
        cy.get('[data-cy=forecast]').should('exist');
      });
  });

  it('should have a weather in C and F for each city', function() {
    cy.get('.rbt-input-main')
      .wait(50)
      .type('Ahe', { delay: 80 })
      .wait(1000) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 150 });
    // Should contain digit C|F
    cy.get('[data-cy=F_data]').each(function(value) {
      const myRe = /\d+ C|F/;
      expect(myRe.test(value[0].textContent)).to.be.true;
    });
    // Should have 3 of C and 3 of F, one for each city.
    cy.get('[data-cy=F_data]').should('exist');

    cy.get('[data-cy=C_data]').should('exist');
  });

  // Tests up to here work with .only
  // Tests below this are ??? - the menu being off screen is an issue again.
  it.only('should NOT delete any cities when CANCEL is selected', function() {
    cy.get('[data-cy=openOnHover]').invoke('toggle');
    // This does not delete! It opens a modal asking to confirm/cancel
    cy.get('[data-cy=buttonToDeleteAll]').click();
    cy.get('[data-cy=buttonCancelDelete]').click();
    // Close the menu for the next test to reopen it.
    cy.get('[data-cy=openOnHover]').invoke('toggle');
    cy.contains('Boston District');
  });

  it('should delete all cities when delete is confirmed', function() {
    cy.get('[data-cy=openOnHover]').invoke('toggle');
    // This does not delete! It opens a modal asking to confirm/cancel
    cy.get('[data-cy=buttonToDeleteAll]').click();
    cy.get('[data-cy=buttonConfirmDelete]').click();
    cy.get('[data-cy=openOnHover]').invoke('toggle');
    cy.contains('No cities here');
    cy.get('[data-cy=forecast]').should('have.length', 0);
  });

  it('should still fetch a city after deleting all', function() {
    // If this is typed too fast, there will be a city search result with only
    // one city inside a button: <button>Boston District, England, GB</button>.
    // This is why I am checking for city name + fetched.
    cy.get('.rbt-input-main')
      .type('Two Boa', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 30 });
    cy.contains('Two Boats');
    cy.get('[data-cy=forecast]').should('have.length', 1);
  });

  it('should delete a city using the close button', function() {
    cy.wait(400);
    cy.get('.rbt-input-main')
      .type('Fareh', { delay: 100 })
      .wait(1000) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 150 });
    cy.contains('Fareham District');
    cy.get('.7290556_closeButton').click();
    cy.get('[data-cy=deleteOneCity]').click();
    cy.contains('Fareh').should('not.exist');
  });
});
