import BaseEntity from './BaseEntity';

export default interface CourseCategory extends BaseEntity {
    display_img_url: string,
    logo_img_url: string,
    slug: string,
    name: string,
    description: string,
    course_category_id: number,
    course_category?: CourseCategory
}