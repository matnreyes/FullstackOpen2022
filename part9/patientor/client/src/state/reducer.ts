import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Array<Diagnosis>;
  }
  | {
    type: "UPDATE_ENTRIES";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
        return {
          ...state,
          patient: action.payload
        };
    case "SET_DIAGNOSES": 
        return {
          ...state,
          diagnosisInfo: action.payload
        };
    case "UPDATE_ENTRIES":
        return {
          ...state,
          patient: action.payload
        };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]) => {
  const actionObject: Action = {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
  return actionObject;
};

export const setPatient = (patient: Patient) => {
  const actionObject: Action = {
    type: "SET_PATIENT",
    payload: patient
  };
  return actionObject;
};

export const addPatient = (patient: Patient) => {
  const actionObject: Action = {
    type: "ADD_PATIENT",
    payload: patient
  };
  return actionObject;
};

export const loadDiagnoses = (diagnosisData: Array<Diagnosis>) => {
  const actionObject: Action = {
    type: "SET_DIAGNOSES",
    payload: diagnosisData
  };
  return actionObject;
};

export const updateEntries = (updatedPatient: Patient) => {
  const actionObject: Action = {
    type: "UPDATE_ENTRIES",
    payload: updatedPatient
  };
  return actionObject;
};