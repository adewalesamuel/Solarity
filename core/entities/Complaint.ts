import User from './User';
import BaseEntity from './BaseEntity';

export default interface Complaint extends BaseEntity {
    description: string,
    attachment_file_url: string,
    user_id: number,
    user?: User,
}