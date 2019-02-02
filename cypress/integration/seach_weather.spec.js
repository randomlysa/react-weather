describe('Search bar', function() {
  it('loads...', function() {
    cy.visit('http://localhost:8080');
    // Expect some content in the div.
    cy.get('[data-cy=nocities').contains(/\w/);
  });

  it('should fetch weather using typeahead, down arrow, enter', function() {
    // If this is typed too fast, there will be a city search result with only
    // one city inside a button: <button>Boston District, England, GB</button>.
    // This is why I am checking for city name + fetched.
    cy.get('.rbt-input-main')
      .type('Boston District', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 30 });
    cy.contains('Boston District');
  });

  it('should fetch weather using typeahead, down arrow, enter AFTER a first search', function() {
    cy.get('.rbt-input-main')
      .wait(50)
      .type('Tokyo', { delay: 80 })
      .wait(1000) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}', { delay: 150 });
    cy.contains('Tokyo');
  });

  it('should show a list of cities if user did not select typeahead option and pressed enter', function() {
    cy.get('.rbt-input-main')
      .wait(400)
      .type('Johan', { delay: 80 })
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{enter}', { delay: 150 });
    cy.get('[data-cy=cityList--city]');
  });

  it('should fetch weather for a city in cityList', function() {
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
      });
  });

  // Click doesn't work...
  // it('should fetch weather when a user clicks on a typeahead item and presses submit', function() {
  //   cy.get('.rbt-input-main')
  //     .type('Prague')
  //     .wait(700); // Wait for typeahead to get some data and make a list.
  //   cy.get('li')
  //     .first()
  //     .click({ x: 5, y: 5 });
  //   cy.get('[data-cy=submit').click();
  // });
});
