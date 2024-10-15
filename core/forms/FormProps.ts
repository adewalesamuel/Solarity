import { PropsWithChildren } from 'react';
import { InputModeOptions } from 'react-native';

export type FormProps = PropsWithChildren & {
    isDisabled: boolean
    handleFormSubmit: () => void,
}

export type ButtonProps = PropsWithChildren & {
    isDisabled: boolean,
    onClick: () => void
}

export type InputProps = {
    placeholder: string | undefined,
    inputMode: InputModeOptions,
    readOnly: boolean,
    value: string | undefined,
    onChange: ((text: string) => void) | undefined,
}