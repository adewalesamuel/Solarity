import { useState } from 'react';
import { Services } from '../services';
import { CONSTS } from '../constants';
import { UseCourse } from '../core/types/hooks/UseCourse';
import Course, { CourseVideoType } from '../core/entities/Course';
import Admin from '../core/entities/Admin';
import CourseCategory from '../core/entities/CourseCategory';

export const useCourse = (): UseCourse => {
    const {SELF_HOSTING} = CONSTS.COURSE.VIDEO_TYPES;

    const [id, setId] = useState<number|''>('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [course_category_id, setCourse_category_id] = useState<number>(-1);
    const [content, setContent] = useState('');
    const [duration, setDuration] = useState<number>(-1);
    const [admin_id, setAdmin_id] = useState<number>(-1);
    const [video_url, setVideo_url] = useState('');
    const [video_type, setVideo_type] = useState<CourseVideoType>(SELF_HOSTING);

    const [admin, setAdmin] = useState<Admin>();
    const [course_category, setCourse_category] = useState<CourseCategory>();
    const [previous, setPrevious] = useState<Course>();
    const [next, setNext] = useState<Course>();

    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getCourse = (slugArg: string, signal: AbortSignal) => {
        return Services.CourseService.getBySlug(slugArg, signal)
        .then(response => {
            fillCourse(response.course as Course);
            setIsDisabled(false);

            return response;
        });
    }

    const createCourse = (signal: AbortSignal) => {
        const payload = {
            name,
		slug,
		description,
		display_img_url,
        content,
        duration,
        admin_id,
		course_category_id,
		video_url,
        video_type,
        };

        return Services.CourseService.create(
        JSON.stringify(payload), signal);
    }
    const updateCourse = (courseSlug: string, signal: AbortSignal) => {
        const payload = {
            name,
		slug,
		description,
		display_img_url,
        content,
        duration,
        admin_id,
		course_category_id,
		video_url,
        video_type,
        };

        return Services.CourseService.update(
            courseSlug, JSON.stringify(payload), signal);
    }
    const deleteCourse = (courseId: string, signal: AbortSignal) => {
        return Services.CourseService.destroy(courseId, signal);
    }
    const fillCourse = (course: Course) => {
        setId(course.id);
        setName(course.name ?? '');
		setSlug(course.slug ?? '');
		setDescription(course.description ?? '');
		setDisplay_img_url(course.display_img_url ?? '');
		setContent(course.content ?? '');
		setDuration(course.duration ?? '');
		setAdmin_id(course.admin_id ?? '');
		setCourse_category_id(course.course_category_id ?? '');
		setAdmin(course.admin);
		setCourse_category(course.course_category);
        setVideo_url(course.video_url ?? '');
        setVideo_type(course.video_type ?? SELF_HOSTING);
        setPrevious(course?.previous);
        setNext(course?.next);

    }
    const emptyCourse = () => {
        setId('');
        setName('');
		setSlug('');
		setDescription('');
		setDisplay_img_url('');
		setContent('');
		setDuration(-1);
		setAdmin_id(-1);
		setCourse_category_id(-1);
		setAdmin(undefined);
		setCourse_category(undefined);
        setVideo_url('');
        setVideo_type(SELF_HOSTING);
        setPrevious(undefined);
        setNext(undefined);
    }

    return {
        id,
        name,
		slug,
		description,
		display_img_url,
        content,
        duration,
        admin_id,
		course_category_id,
        admin,
        course_category,
        video_url,
        video_type,
        previous,
        next,

        errors,
        isDisabled,
        setName,
		setSlug,
		setDescription,
		setDisplay_img_url,
		setContent,
		setDuration,
		setAdmin_id,
		setCourse_category_id,
		setAdmin,
		setCourse_category,
        setVideo_url,
        setVideo_type,

        setId,
        setErrors,
        setIsDisabled,
        getCourse,
        createCourse,
        updateCourse,
        deleteCourse,
        fillCourse,
        emptyCourse,
    };
}