import fs from 'fs';
import config from '../config/config';
import path from 'path';

// ------------------------------------------------------------------------+
import Cookies from 'cookies';
import { getStoredState } from 'redux-persist'; // https://github.com/rt2zz/redux-persist
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage'; // https://github.com/abersager/redux-persist-cookie-storage
// ------------------------------------------------------------------------+

import React from 'react';

// ----------------------------------
import asyncMatchRoutes from '../server/utils/asyncMatchRoutes';
// ----------------------------------

// ----------------------------------
import { StaticRouter } from 'react-router';
// ----------------------------------

// ----------------------------------
import { ReduxAsyncConnect } from '../shared';
// ----------------------------------

// ----------------------------------
import { renderRoutes } from 'react-router-config';
// ----------------------------------

// ----------------------------------
import ReactDOM from 'react-dom/server';
// ----------------------------------

import createMemoryHistory from 'history/createMemoryHistory';

import routes from '../shared/routes';

import { trigger } from 'redial';

// holds a global cache of all the universal components that are rendered and makes them available via flushChunkNames
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { flushFiles } from 'webpack-flush-chunks';

import Html from '../server/utils/Html';

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

function reactDOMRenderToString(o, c, r) {
  return (
    <StaticRouter location={o} context={c}>
      <ReduxAsyncConnect routes={r} >
        {renderRoutes(r)}
      </ReduxAsyncConnect>
    </StaticRouter>
  );
}

export default ({ clientStats }) => async (req, res) => {

  console.log('>>>>>>>>>>>>>>>>> SERVER > __CLIENT__ ?: ', __CLIENT__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > __SERVER__ ?: ', __SERVER__);

  // progressive app manifest
  // https://www.w3.org/TR/appmanifest/
  if (req.url == '/manifest.json') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > manifest.json <<<<<<<<<<<<<<<<<<<<<<<');
    return res.sendFile(path.join(__dirname, '..', 'build', 'static', 'manifest.json'));
  }

  // if (req.url == '/dist/service-worker.js') {
  //   console.log('>>>>>>>>>>>>>>>>> SERVER > service-worker <<<<<<<<<<<<<<<<<<<<<<<');
  //   res.setHeader('Service-Worker-Allowed', '/');
  //   res.setHeader('Cache-Control', 'no-store');
  //   return;
  // }

  if (req.url == '/dlls/:dllName.js') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > /dlls/:dllName.js <<<<<<<<<<<<<<<<<<<<<<<');
    return fs.access(
      path.join(__dirname, '..', 'build', 'static', 'dist', 'dlls', `${req.params.dllName}.js`),
      fs.constants.R_OK,
      err => (err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : null)
    );
  };

  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST IN >>> <<<<<<<<<<<<<<<<<<<<<<<');
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.ip +++++++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.method +++++++++++++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++++++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.path ++++++++++++++++++: ', req.path);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++++++++++++: ', req.headers);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.cookies ++++++++++++++: ', req.cookies);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.session ++++++++: ', req.session);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.params +++++++++: ', req.params);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.originalUrl ++++: ', req.originalUrl);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST IN <<< <<<<<<<<<<<<<<<<<<<<<<<');

  // #########################################################################

  console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > SetUpComponent !! START !! <<<<<<<<<<<<<<<<<<<<<<<');

  // 'initialEntries': The initial URLs in the history stack
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

  console.log('>>>>>>>>>>>>>>>>>>> SERVER.JS > APP LOADER > history: ', history)

  // ------------------------------------------------------------------------+
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res)); // node module for getting and setting HTTP cookies

  // type PersistConfig:
  // {
  //   key: string, // the key for the persist
  //   storage: Object, // the storage adapter, following the AsyncStorage api
  //   version?: number, // the state version as an integer (defaults to -1)
  //   blacklist?: Array<string>, // do not persist these keys
  //   whitelist?: Array<string>, // only persist these keys
  //   migrate?: (Object, number) => Promise<Object>,
  //   transforms?: Array<Transform>,
  //   throttle?: number, // ms to throttle state writes
  //   keyPrefix?: string, // will be prefixed to the storage key
  //   debug?: boolean, // true -> verbose logs
  //   stateReconciler?: false | StateReconciler, // false -> do not automatically reconcile state
  //   serialize?: boolean, // false -> do not call JSON.parse & stringify when setting & getting from storage
  //   writeFailHandler?: Function, // will be called if the storage engine fails during setItem()
  // }

  const persistConfig = {
    key: 'root',
    storage: new CookieStorage(cookieJar),
    stateReconciler: (inboundState, originalState) => originalState,
    whitelist: ['auth', 'info',]
  };

  let preloadedState;

  const context = {};

  // ===============================================================================
  // ===============================================================================

  console.log('>>>>>>>>>>>>>>>>> SERVER > SPA > __DISABLE_SSR__:', __DISABLE_SSR__);

  function hydrate(a) {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={a} />).pipe(res);
  }

  if (__DISABLE_SSR__) {

    ReactDOM.renderToString( reactDOMRenderToString(req.originalUrl, context, routes) );

    return hydrate( flushChunks(clientStats, {chunkNames: flushChunkNames()}) );
  }

  // ===============================================================================
  // ===============================================================================

  // try {
  //   // Returns a promise of restored state (getStoredState())
  //   preloadedState = await getStoredState(persistConfig);
  // } catch (e) {
  //   preloadedState = {};
  // }
  // ------------------------------------------------------------------------+

  try {

    const { components, match, params } = await asyncMatchRoutes(routes, req.path);

    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > components: ', components);
    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > match: ', match);
    console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > params: ', params);

    const locals = {
      match,
      params,
      history,
      location: history.location
    };

    await trigger( 'fetch', components, locals);

    // const chunkNames = [];
    // build step and render step ARE separate
    // const component = (
    //   <ReportChunks report={chunkName => chunkNames.push(chunkName)}>
    //    ...
    //   </ReportChunks>
    // );

    // build step and render step NOT separate
    const component = ( reactDOMRenderToString(req.originalUrl, context, routes) );
  
    const content = ReactDOM.renderToString(component);

    // ------------------------------------------------------------------------------------------------------


    const assets = flushChunks(clientStats, {chunkNames: flushChunkNames()});

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > JS: ', assets.Js);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > STYLES: ', assets.Styles);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CSS: ', assets.Css);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .js: ', assets.js);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > styles: ', assets.styles);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .css: ', assets.css);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > scripts: ', assets.scripts);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > stylesheets: ', assets.stylesheets);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHashRaw: ', assets.cssHashRaw);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHash: ', assets.cssHash);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CssHash: ', assets.CssHash);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > publicPath: ', assets.publicPath);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > outputPath: ', assets.outputPath);

    // ======================================================================================

    // console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > context: ', context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    // ------------------------------------------------------------------------------------------------------

    console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== content: ', content);

    const html = <Html assets={assets} content={content} />;
    const ssrHtml = `<!doctype html>${ReactDOM.renderToString(html)}`;
    console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > RESPOND TO CLIENT !! > ReactDOM.renderToString(html):', ssrHtml);

    res.status(200).send(ssrHtml);
    // res.status(200).send('SERVER > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');

  } catch (error) {
    console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > TRY > ERROR > error: ', error);
    res.status(500);
    hydrate();
  }
};
