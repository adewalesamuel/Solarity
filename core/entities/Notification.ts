import BaseEntity from './BaseEntity';

export default interface Notification extends BaseEntity {
    type: string,
    notifiable_type: string,
    notifiable_id: number,
    data: any,
    read_at: string,
};