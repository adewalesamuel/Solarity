export default interface Notification {
    id: string,
    type: string,
    notifiable_type: string,
    notifiable_id: number,
    data: object,
    read_at: string,
    created_at: string,
    updated_at: string
}