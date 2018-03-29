# Ng5 PWA toybox

This is very rough around the edges and only serves as a project to fool around with and test different ideas in ng5

This is a very simple client-side-only application I am using to explore the use various libraries with Angular5. Currently Ive setup the layout so that there is a primary navigation component which acts as a portal to the different subdirectories within the project. Each subdirectory has an entry point declared in `app.routing.module` which targets a primary module specific to that child. Each child then has its own routing configuration declared in a `.routes` file.

Currently the demos included in the toybox are for a few D3js components and material-ui

## Current Issues
- Named Routes:
    - In the d3-demo module I was exploring the use of named routes within angular and created a service to provide a way of providing the service to each submodule within the project. There was an issue with creating the production build out of the configuration though which suggests that the way I have the constructor setup within the `Routing.Service` does not allow for the instantiation of the service outside of a component as I have done in `d3-route.config.ts`. I need to find some different way of referencing the service. 
- ServiceWorker
    - I have a serviceworker setup for the application to allow for offline access of resources, however I have noticed when using a childroute the serviceworker does not service the request and the browser ends up with a 504. Navigating to the child route from the base port works fine.


## Running the application
- for production use your favorite lightweight web server to serve dist/index.html
- for development use the angular CLI fallback
```
    ng serve
```