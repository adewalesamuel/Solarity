import CourseCategory from './CourseCategory';

export type CourseVideoType = 'youtube' | 'vimeo' | 'self_hosting' | 'other';
import BaseEntity from './BaseEntity';

export default interface Course extends BaseEntity {
    name: string,
    content: string,
    duration: number,
    slug: string,
    description: string,
    display_img_url: string,
    course_category_id: number,
    admin_id: number,
    video_url: string,
    video_type: CourseVideoType,
    course_category?: CourseCategory
}