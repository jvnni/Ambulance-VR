// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  const s = r360.getDefaultSurface();
  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Same', { /* initial props */ }),
    s,
    s.resize(4680, 2000),
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
