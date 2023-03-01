export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>
}

type SickLeaveTime = {
  startDate: string,
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  specialist: string;
  employerName: string;
  sickLeave?: SickLeaveTime;
}

type Discharge = {
  date: string,
  criteria: string,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  specialist: string;
  discharge: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  occupation: string,
  ssn: string,
  entries: Entry[]
};

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
