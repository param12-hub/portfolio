/// <reference types="vite/client" />
import React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        mesh: any;
        group: any;
        ambientLight: any;
        directionalLight: any;
        icosahedronGeometry: any;
      }
    }
  }
}
