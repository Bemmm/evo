import { PhotoCard, User } from 'app/shared/models';

export interface AppState {
    readonly selectedPhotos: PhotoCard[];
    readonly cartCount: number;
    readonly user: User
}