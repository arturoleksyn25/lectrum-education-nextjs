// Core
import React from 'react';
import { NextScript } from 'next/document';

// Other
import { generateInnerScript } from './helpers/generateInnerScript';
import { getScriptsDelay } from './helpers/getScriptsDelay';

export class NextScriptCustom extends NextScript {
  render() {
    const { userAgent } = this.context;
    const calculatedDelay = getScriptsDelay({ userAgent });
    const orgNextScripts = super.render().props.children.flat();

    const scripts = orgNextScripts.filter((child) => {
      if (child.props.id === '__NEXT_DATA__') {
        return {
          props: { ...child.props },
          // eslint-disable-next-line no-underscore-dangle
          content: child.props.dangerouslySetInnerHTML.__html,
        };
      }

      if (child.props.src.includes('polyfills')) {
        return null;
      }

      if (child.type === 'script') {
        return {
          props: { ...child.props },
          content: '',
        };
      }

      return null;
    }).filter(Boolean);

    const initialFilterer = (props) => !props.src || !props.src.includes('chunk');
    const nextDataFilter = (props) => props.id === '__NEXT_DATA__';
    let initialLoadScripts = scripts.filter(({ props }) => props && initialFilterer(props));
    const nextDataScripts = initialLoadScripts.filter(
      ({ props }) => props && nextDataFilter(props),
    );
    initialLoadScripts = initialLoadScripts.filter(({ props }) => props && !nextDataFilter(props));
    const chunkedScripts = scripts.filter(({ props }) => props && !initialFilterer(props));

    const polyfill = super.getPolyfillScripts();
    const polyfillJSX = polyfill.map(({ props }) => (
      <script key={`initialScript${props.src}${props.id}`} {...props} src={props.src} />
    ));
    const innerScriptsJSX = generateInnerScript(chunkedScripts, calculatedDelay);
    const initialLoadScriptsJSX = initialLoadScripts.map(({ props }) => (
      <script key={`initialScript${props.src}${props.id}`} {...props} src={props.src} />
    ));

    const nextDataScriptsJSX = nextDataScripts.map(({ props }) => (
      <script key={`initialScript${props.src}${props.id}`} {...props} src={props.src} />
    ));
    return (
      <>
        {polyfillJSX}
        {nextDataScriptsJSX}
        {/* eslint-disable-next-line react/no-danger */}
        <script id='__NEXT_SCRIPT_CUSTOM' defer dangerouslySetInnerHTML={{ __html: innerScriptsJSX }} />
        {initialLoadScriptsJSX}
      </>
    );
  }
}
