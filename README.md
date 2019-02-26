# bootstrap-react-redux-webpack-ssr-eight

## Overview:

App builds off recent 'bootstrap-react-redux-webpack-ssr-five' and a bit of 'bootstrap-react-redux-webpack-ssr-seven'.

This app's initial focus will be applying thunk middleware for Redux.


The best thing to do to speed up your page loading when using scripts is to put them in the <head>, and add a 'defer' attribute to your <script> tag:

<script defer src="script.js"></script>

This is the scenario that triggers the faster 'domInteractive' event.