"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return Object.assign(Object.assign({}, state), { patients: Object.assign(Object.assign({}, action.payload.reduce((memo, patient) => (Object.assign(Object.assign({}, memo), { [patient.id]: patient })), {})), state.patients) });
        case "ADD_PATIENT":
            return Object.assign(Object.assign({}, state), { patients: Object.assign(Object.assign({}, state.patients), { [action.payload.id]: action.payload }) });
        default:
            return state;
    }
};
exports.reducer = reducer;
