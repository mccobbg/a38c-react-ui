import { ReactNode, createContext, useContext, useReducer } from 'react';
import { User } from '../types';

type State = {
  authUser: User | null;
};

type Action = {
  type: string;
  payload: User | null;
};

interface StateContextData {
    state: State;
    dispatch: Dispatch;
}

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

type StateContextProviderProps = { children: ReactNode };

const StateContext = createContext<StateContextData | undefined>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
