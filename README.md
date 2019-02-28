# bootstrap-react-redux-webpack-ssr-eight

## Overview:

App builds off recent 'bootstrap-react-redux-webpack-ssr-five' and a bit of 'bootstrap-react-redux-webpack-ssr-seven'.

This app's initial focus will be applying thunk middleware for Redux.


page loading using scripts: put them in <head> and add a 'defer' attribute to <script> tag:

<script defer src="script.js"></script>

triggers the faster 'domInteractive' event