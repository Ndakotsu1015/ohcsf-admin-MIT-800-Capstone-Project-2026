export enum AppNotificationType {
    NONE = 'None',
    SUCCESS = 'Success',
    ERROR = 'Error',
    WARNING = 'Warning',
    INFO = 'Info',
}

export interface AppNotificationState {
    type: AppNotificationType;
    title: string | null;
    message: string | null;
}