export default interface CourseCategory {
    id: number,
    display_img_url: string,
    logo_img_url: string,
    slug: string,
    name: string,
    description: string,
    course_category_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    course_category?: CourseCategory
}