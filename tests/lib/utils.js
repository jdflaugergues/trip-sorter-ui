import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


function shallowRender(shallowComponent, context) {

  const shallowRenderer = new ReactShallowRenderer();

  shallowRenderer.render(shallowComponent, context);

  return shallowRenderer.getRenderOutput();
}

// Helper function to wrap component with a component that has context
function wrapWithContext(context, contextTypes, Children) {

  class WrapperWithContext extends React.Component {

    getChildContext() {
      return context;
    }

    render() {
      return <MuiThemeProvider muiTheme={context.muiTheme}>{Children}</MuiThemeProvider>;
    }
  }

  WrapperWithContext.childContextTypes = contextTypes;

  return <WrapperWithContext/>;
}

export {shallowRender, wrapWithContext};
