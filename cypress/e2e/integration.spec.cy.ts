/// <reference types="cypress" />

describe('results page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should navigate to next page', () => {
    cy.get('.pagination-button.next').click()
      .wait(500)
    cy.get('.pagination-button.page')
      .eq(1)
      .should('have.class', 'active')
  })

  it('should navigate to last page', () => {
    cy.get('.pagination-button.last').click()
      .wait(500)
    cy.get('.pagination-button.page')
      .last()
      .should('have.class', 'active')
  })

  it('should show spiderman movies', () => {
    cy.get('.search-wrapper')
      .find('input')
      .type('spiderman')
      .wait(500)
    cy.get('.thumbnail')
      .first()
      .contains('spiderman', { matchCase: false })
  })

  it('should add movie to favourite', () => {
    cy.get('.thumbnail')
      .first()
      .find('.icon')
      .trigger('click')
    cy.visit('http://localhost:3000/favourites')
    cy.get('.thumbnail')
      .first()
      .contains('waterworld', { matchCase: false })
  })

  it('should remove movie from favourite', () => {
    cy.get('.thumbnail')
      .first()
      .find('.icon')
      .trigger('click')
    cy.visit('http://localhost:3000/favourites')
    cy.get('.thumbnail')
      .first()
      .find('.icon')
      .trigger('click')
    cy.get('.thumbnail')
      .should('have.length', 0)
  })
})