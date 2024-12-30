import Admin from '../../entities/Admin';
import Course, { CourseVideoType } from '../../entities/Course';
import CourseCategory from '../../entities/CourseCategory';
import { Response } from '../services';
import BaseHook from './BaseHook';

export type UseCourse = BaseHook & {
    name: string,
    slug: string,
    description: string,
    display_img_url: string,
    content: string,
    duration: number,
    admin_id: number,
    course_category_id: number,
    admin?: Admin,
    course_category?: CourseCategory,
    video_url: string,
    video_type: CourseVideoType,
    previous?: Course,
    next?: Course,

    setName: (arg: string) => void,
    setSlug: (arg: string) => void,
    setDescription: (arg: string) => void,
    setDisplay_img_url: (arg: string) => void,
    setContent: (arg: string) => void,
    setDuration: (arg: number) => void,
    setAdmin_id: (arg: number) => void,
    setCourse_category_id: (arg: number) => void,
    setAdmin: (arg: Admin) => void,
    setCourse_category: (arg: CourseCategory) => void,
    setVideo_url: (arg: string) => void,
    setVideo_type: (arg: CourseVideoType) => void,

    getCourse: (courseSlug: string, signal: AbortSignal) => Promise<Response<Course | Course[]>>,
    createCourse: (signal: AbortSignal) => Promise<Response<Course>>,
    updateCourse: (courseSlug: string, signal: AbortSignal) => Promise<Response<Course>>,
    deleteCourse: (courseSlug: string, signal: AbortSignal) => Promise<Response<Course>>,
    fillCourse: (course: Course) => void,
    emptyCourse: () => void,
}