export interface ResumeDataProps {
  institution_name: string;
  subject_or_skill_name: string;
  degree_of_grade: string;
  year_start: string;
  year_end: string;
}

export interface FormikValuesProp {
  year_start?: any;
  year_end?: any;
  c_inst_name: string;
  c_sub_name: string;
  c_degree: string;
  c_years: string;
  degree_of_grade: string;
}
