import { PhotoCard } from './photo-card.model';

export interface PhotosForAccount {
    list: PhotoCard[],
    eventNames: string[],
    studentNames: string[],
    selected: any[],
    venues: any[],
    loading: boolean
}