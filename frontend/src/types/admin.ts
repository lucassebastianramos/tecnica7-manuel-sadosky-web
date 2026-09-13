/**
 * Entidades de dominio del panel de administración y campus.
 * Centralizadas para erradicar `any` y tipar respuestas del backend.
 */

export interface Setting {
  key: string;
  value: string;
}

export interface SchoolEvent {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at?: string | null;
}

export interface RadioProgram {
  id: number;
  title: string;
  description: string;
}

export interface StudentCenter {
  id: number;
  name: string;
  period: string;
  president: string;
}

export interface TopCourse {
  name: string;
  count: number;
}

export interface MonthlyEnrollment {
  month: string;
  count: number;
}

export interface ReportData {
  coursesCount: number;
  enrollmentsCount: number;
  topCourses: TopCourse[];
  monthlyEnrollments: MonthlyEnrollment[];
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message?: string;
  submitted_at: string;
}

export interface EnrollmentStudentUser {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}

export interface Enrollment {
  id: number;
  student_id: number;
  student?: {
    user?: EnrollmentStudentUser | null;
  } | null;
}

export interface CourseDetail {
  course_id: number;
  enrollments: Enrollment[];
}

export interface CampusCourse {
  id: number;
  name: string;
  year?: number | null;
  division?: string | null;
  teacher_name?: string | null;
}

export interface CourseMaterial {
  id: number;
  title: string;
  description?: string | null;
  url?: string | null;
  created_at?: string;
}

export interface GradeEntry {
  id: number;
  subject?: string | null;
  grade?: number | string | null;
  period?: string | null;
  [key: string]: unknown;
}

export interface SubjectEntry {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface CampusMyCourse {
  course_id: number;
  name: string;
  description?: string | null;
  teacher_name?: string | null;
  year?: number | null;
  division?: string | null;
}

export interface CampusGrade {
  id: number;
  course_name?: string;
  title: string;
  score: number;
  max_score: number;
}
