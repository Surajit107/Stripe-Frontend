// Header type
export type CustomHeadersType = {
    headers: {
        Authorization: string
    }
};
// Form input Event type
export type SyntheticBaseEvent = {
    target: {
        value: string;
        name: string;
    };
};
// Form value props type
export type FormValues_Props = {
    data?: FormData | undefined;
    header?: CustomHeadersType | undefined;
    resetForm?: Function;
};
// ActionType
export interface ActionType<PT> {
    payload: PT,
    type: string
};
// CustomAlertProps
export type CustomAlertProps = {
    type: 'success' | 'danger' | 'warning' | 'info' | 'dark';
    message: string;
    onClose: () => void;
};
// User drop down links type
export type dropdownItemsType = {
    icon: string;
    text: string;
    link: string;
};
// NetworkResppne interface
export interface NetworkResppne<D> {
    success: boolean,
    message: string,
    data: D,
    token?: string
}