import { PreferencesComponent } from "src/app/preferences/preferences.component"
import {genBackfillMonth, genDay, genMonth} from "../../src/app/home/home.component";
import {DateTime} from "luxon";

describe('template spec', () => {
  it('passes', () => {
    // click cog
    cy.visit('http://localhost:4200')
    // click cog
    cy.get('.cog').click()
    cy.contains('Preferences').click()
    // click clr-dropdown
    cy.contains('Header Color').click()
    // check for purple
    cy.contains('Purple').click()
    // check for blue
    cy.contains('Blue').click()
    // check for slate
    cy.contains('Slate').click()
    // click account
    cy.contains('Account').click()
    // click logo
    cy.contains('Routinely').click()
    // click cog
    cy.get('.cog').click()
    // check login
    cy.contains('Log in').click()
    // check clock link works
    cy.get('.clock').click()
    // check sidebar link works
    cy.get('.bug-report').click()
  })

})

describe('modal', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200')
    cy.get('.addEvent').click()
    cy.get('.startdate').eq(8).should('be.disabled')
    cy.get('.enddate').eq(8).should('be.disabled')
    cy.get('.startdate').eq(8).should('not.be.disabled')
    cy.contains('Recurring').click()
    cy.get('.startdate').eq(8).should('not.be.disabled')
    cy.get('.enddate').eq(8).should('not.be.disabled')
    cy.get('.startdate').eq(8).should('be.disabled')
  })

})
