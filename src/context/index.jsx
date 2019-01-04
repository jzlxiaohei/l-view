import React from 'react';

export const WidgetModes = {
  Dev: 'dev',
  Prod: 'prod',
}

export const WidgetModeContext = React.createContext(
  WidgetModes.Dev,
)
