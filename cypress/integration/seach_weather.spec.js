describe('Search bar', function() {
  it('loads...', function() {
    cy.visit('http://localhost:8080');
    // Expect some content in the div.
    cy.get('[data-cy=nocities').contains(/\w/);
  });

  it('works to search using typeahead, down arrow, enter', function() {
    // If this is typed too fast, there will be a city search result with only
    // one city inside a button: <button>Boston District, England, GB</button>.
    // This is why I am checking for city name + fetched.
    cy.get('.rbt-input-main')
      .type('Boston District')
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}');
    cy.contains('Boston District fetched');
  });

  it('works to search using typeahead, down arrow, enter AFTER a first search', function() {
    cy.get('.rbt-input-main')
      .type('Tokyo')
      .wait(700) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}');
    cy.contains('Tokyo fetched');
  });

  it('shows a list of cities if user did not select typeahead option and pressed enter', function() {
    cy.get('.rbt-input-main')
      .type('Johan')
      .wait(400) // Wait for typeahead to get some data and make a list.
      .type('{downarrow}{enter}');
    cy.get('[data-cy=cityList]');
  });
});
