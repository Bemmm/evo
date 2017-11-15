import { ProductConfiguration, OrderItem } from 'app/shared/models';

export class Photo {
    id: string;
    document: {
        documentId: string;
        thumbnail: string;
        background: string;
        backgroundKey: string;
        backgroundName: string;
    };
    guid: string;
    type: string;
    retouch: string;
    greenScreen: string;
    event: {
        key: string;
        type: string;
        name: string;
        year: string;
    };
    pose: string;
    subject: {
        id: string;
        firstName: string;
        lastName: string;
        type: string;
    };
    photoKey: string;
    photoSessionKey: string;
    prepurchase: boolean
}

export class PhotoItem {
    photo: Photo;
    product: ProductConfiguration;
    orderItems: OrderItem[];
    retouchItem: any;
    paperType: string;
}

export class PhotoDetails {
    guid: string | null;
    documentId?: string;
    photoSessionKey: string;
    type: string;
    pose: string;
    creationDateTime: string | null;
    retouchFlag: boolean | null;
    retouch: string | null;
    greenScreenFlag: boolean | null;
    status: string;
    url: string;
    photoKey: string;
    event: {
        key: string;
        type: string;
        name: string;
        date: string | null;
        yearbookBackgroundChoice: string;
        year: string;
    };
    subject: {
        id: string;
        firstName: string;
        lastName: string;
        type: string
    };
    retouchDescription: string;
    retouchStatus: string;
}
