import React from 'react';
import { TreeAction, TreeActionType } from '../types';

export const TreeActionContext = React.createContext<{
  action: TreeAction;
  triggerAction: (actionType: TreeActionType, path: string) => Promise<void>;
  stopAction: () => void;
}>({
  action: undefined,
  triggerAction: () => Promise.resolve(),
  stopAction: () => { },
});
