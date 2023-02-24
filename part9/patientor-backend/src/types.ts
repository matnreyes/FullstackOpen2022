// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

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