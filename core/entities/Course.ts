import CourseCategory from './CourseCategory';

export type CourseVideoType = 'youtube' | 'vimeo' | 'self_hosting' | 'other';

export default interface Course {
    id: number,
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
    deleted_at: string,
    created_at: string,
    updated_at: string,
    course_category?: CourseCategory
}