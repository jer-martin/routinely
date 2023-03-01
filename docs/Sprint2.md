# Sprint 2

Front-end video | Back-end video


## Work Synopsis
### Frontend
 - We fleshed out the calendar page design with more features, like an event filter and a view switcher.
 - We created a radio button group that allows us to switch between week, month, and day views for the schedule. We have also made the month, week, and day views.
 - We updated the preferences page to include options to change the header color and switch between light/dark mode.
 - We built a microservice to locally store dates and preferences across pages on the site.
 - We created an "Add Event" modal, which allows you to input an event's name, category, and date.
 - We lined up the month intervals with the days of the week, so that the numbering of days on the calendar lines up with real-time. For example, this year, March starts on a Wednesday. On the calendar, the days are numbered beginning on Wednesday.
 - We added animations to switching months.

### Backend
 - Studied (alot of) documenation to better understand gin framework and also read angular documentation in order to properly integrate services.
 - Updated proxy services in the front end to be able to send requests to the backend (backend listens on port 5000)
 - Finished up user login , right now the user is identified by a unique username and "user type" with the intention of differentiating between students and "regular" users. (Subject to change)
 - User creation completed with guards in place to make sure all usernames are unique (no duplicates)
 - Updated some more front end code to better integrate with backend, havent merged with main because its still in progress. This work is on BRYANS FORK (https://github.com/bryanesquivias/Routinely) . 
 - Compelted unit tests for current functions , mocked data is hardcoded but also looking into mocking frameworks to integrate.

## Testing
### Frontend
#### Test 1 (Cypress):
```
import { PreferencesComponent } from "src/app/preferences/preferences.component"

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
```

#### Test 2:
```
enter code here
```

#### Test 3:
```
enter code here
```
### Backend
#### Test 1:
```
enter code here
```

#### Test 2:
```
enter code here
```

#### Test 3:
```
enter code here
```

## Backend Documentation
