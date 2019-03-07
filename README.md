# bootstrap-react-redux-webpack-ssr-eight

## Overview:

App builds off recent 'bootstrap-react-redux-webpack-ssr-five' and a bit of 'bootstrap-react-redux-webpack-ssr-seven'.

This app's initial focus will be applying thunk middleware for Redux.


page loading using scripts: put them in <head> and add a 'defer' attribute to <script> tag:

<script defer src="script.js"></script>

triggers the faster 'domInteractive' event

* Some common rules of thumb for determining what kind of data should be put into Redux:

- Do other parts of the application care about this data?
- Do you need to be able to create further derived data based on this original data?
- Is the same data being used to drive multiple components?
- Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
- Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
- Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when swapped)?

* For the app, what will be stored into Redux (state):

- Choice: keep every piece of data in Redux, to maintain a fully serializable and controlled version of the application at all times
- Choice: keep non-critical or UI state, such as 'is this dropdown currently open', inside a component's internal state