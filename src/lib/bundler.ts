import * as React from "react";
import * as _jsx_runtime from "react/jsx-runtime";
import * as ReactDOM from "react-dom";

function getExport(code: string) {
  // TODO: consider
  const scope = { React, ReactDOM, _jsx_runtime };
  // eslint-disable-next-line
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope));
}

function getComponent(code: string) {
  const mdxExport = getExport(code);
  return mdxExport.default;
}

export { getExport, getComponent };
