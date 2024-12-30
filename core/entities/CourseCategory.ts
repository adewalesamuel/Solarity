import Admin from './Admin';
import BaseEntity from './BaseEntity';
import Course from './Course';

export default interface CourseCategory extends BaseEntity {
    display_img_url: string,
    logo_img_url: string,
    slug: string,
    name: string,
    description: string,
    course_category_id: number,
    course_category?: CourseCategory
    admin?: Admin,
    next?: Course
    previous?: Course,
}