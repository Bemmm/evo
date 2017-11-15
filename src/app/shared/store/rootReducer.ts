import { selectedPhotosReducer } from './selected-photos';
import { cartReducer } from './cart';
import { userReducer } from './user';

export const rootReducer = {
    selectedPhotos: selectedPhotosReducer,
    cartCount: cartReducer,
    user: userReducer
};