export type CRUDResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
};

export type CRUDSingularActions = 'Create' | 'Read' | 'Update' | 'Delete';
export type CRUDPluralActions = 'CreateMany' | 'ReadMany' | 'UpdateMany' | 'DeleteMany';
export type CRUDSubscribeActions = 'Subscribe' | 'Unsubscribe';
export type CRUDActions = CRUDSingularActions | CRUDPluralActions | CRUDSubscribeActions; 