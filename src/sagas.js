import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import * as userActions from './reducers/user';
import * as appActions from './reducers/app';
import apiCall from './utils/api';
import logStep from '../helpers/stepLogger';

function* guessCountryCodeSaga() {
    try {
        const countryCode = yield call(
            apiCall,
            '/api/guess_country',
            {},
            'GET'
        );
        yield put(userActions.setCountryCode(countryCode));
    } catch (e) {
        yield put(userActions.setCountryCode(null));
    }
}

function* incrementStepSaga() {
    const steps = yield select(appActions.getSteps);
    const currentStep = yield select(userActions.getStep);
    const nextStep = steps.get(steps.indexOf(currentStep) + 1);
    try {
        // TODO: Update the user in the DB.
        yield put(userActions.setStep(nextStep));
    } catch (e) {
        // TODO: Handle Error state in the redux store.
    }
}

function* decrementStepSaga() {
    const steps = yield select(appActions.getSteps);
    const currentStep = yield select(userActions.getStep);
    const nextStep = steps.get(steps.indexOf(currentStep) - 1);
    try {
        // TODO: Update the user in the DB.
        yield put(userActions.setStep(nextStep));
    } catch (e) {
        // TODO: Handle Error state in the redux store.
    }
}

function* logStepSaga() {
    const currentStep = yield select(userActions.getStep);
    const uid = yield select(userActions.getTrackingId);
    try {
        yield call(logStep(uid, currentStep));
    } catch (e) {}
}

function* watchGuessCountryCodeSaga() {
    yield takeEvery('user/GUESS_COUNTRY_CODE', guessCountryCodeSaga);
}

function* watchIncrementStepSaga() {
    yield takeEvery('user/INCREMENT_STEP', incrementStepSaga);
}

function* watchDecrementStepSaga() {
    yield takeEvery('user/DECREMENT_STEP', decrementStepSaga);
}

function* watchLogStepSaga() {
    yield takeEvery('user/SET_STEP', logStepSaga);
}

function* rootSaga() {
    yield all([
        watchGuessCountryCodeSaga(),
        watchIncrementStepSaga(),
        watchDecrementStepSaga(),
        watchLogStepSaga(),
    ]);
}

export default rootSaga;
