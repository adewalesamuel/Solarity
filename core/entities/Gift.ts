import BaseEntity from './BaseEntity';

export default interface Gift extends BaseEntity {
    img_url: string,
    name: string,
    description: string,
    amount: number,
    point_number: number,
}