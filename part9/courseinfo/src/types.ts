export type Course = {
  name: string,
  parts: Array<Part>
}

export type Part = {
  name: string,
  exerciseCount: number,
};