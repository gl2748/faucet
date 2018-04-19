import { Map, List } from 'immutable';

const CHECKPOINT = 'tracking/CHECKPOINT';
const SET_LOGGED_CHECKPOINT = 'tracking/SET_LOGGED_CHECKPOINT';

const defaultState = Map({
    checkpoint: '',
    loggedCheckpoints: List([])
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case CHECKPOINT:
            return state.set('checkpoint', action.payload.checkpoint);
        case SET_LOGGED_CHECKPOINT:
            return state.insert(
                state.loggedCheckpoints.size,
                action.payload.checkpoint
            );
        default:
            return state;
    }
}

export const logCheckpoint = checkpoint => ({
    type: CHECKPOINT,
    payload: { checkpoint }
});

export const setLoggedCheckpoint = loggedCheckpoint => ({
    type: SET_LOGGED_CHECKPOINT,
    payload: { loggedCheckpoint }
});

// Selectors
export const getCheckpoint = state => state.get('checkpoint');
export const getLoggedCheckpoints = state => state.get('loggedCheckpoints');
