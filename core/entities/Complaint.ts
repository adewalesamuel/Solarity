import User from './User';

export default interface Complaint {
    id: number,
    description: string,
    attachment_file_url: string,
    user_id: number,
    deleted_at: string,
    created_at: string,
    updated_at: string,
    user?: User,
}