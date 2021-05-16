import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface WebSettingsState {
    isLoading: boolean;
    settings: WebSettings;
}

export interface WebSettings {
    appId: string;
    redirectUri: string;
    scopes: string[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestWebSettingsAction {
    type: 'REQUEST_WEB_SETTINGS';
}

interface ReceiveWebSettingsAction {
    type: 'RECEIVE_WEB_SETTINGS';
    settings: WebSettings;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).

type KnownAction = RequestWebSettingsAction | ReceiveWebSettingsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestWebSettings: () : AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.webSettings)
        {
            fetch('websettings')
                .then(response => response.json() as Promise<WebSettings>)
                .then(data => dispatch({ type: 'RECEIVE_WEB_SETTINGS', settings: data}));

            dispatch({ type: 'REQUEST_WEB_SETTINGS' });
        }
    }
}

const unloadedState: WebSettingsState = { isLoading: false, settings: { appId: '', redirectUri: '', scopes: [] } };

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<WebSettingsState> = (state: WebSettingsState | undefined, incomingAction: Action): WebSettingsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch(action.type) {
        case 'REQUEST_WEB_SETTINGS':
            return {
                isLoading: true,
                settings: { appId: '', redirectUri: '', scopes: [] }
            };
        case 'RECEIVE_WEB_SETTINGS':
            return {
                isLoading: false,
                settings: action.settings
            };
        default:
            return state;
    }
};