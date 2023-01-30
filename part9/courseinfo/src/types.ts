export type Course = {
  name: string,
  parts: Array<Part>
}

export type Part = {
  name: string,
  exerciseCount: number,
};

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface DescriptivePart extends CoursePartBase {
  description: string,
}

interface CourseNormalPart extends DescriptivePart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends DescriptivePart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface SpecialCoursePart extends DescriptivePart {
  type: "special";
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | SpecialCoursePart;