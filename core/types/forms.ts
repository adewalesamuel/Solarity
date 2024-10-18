import { PropsWithChildren } from 'react';
import { InputModeOptions } from 'react-native';

type KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';

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
    inputMode?: InputModeOptions,
    readOnly: boolean,
    value: string | undefined,
    keyboardType:  KeyboardType,
    isPassword?: boolean,
    onChange: ((text: string) => void) | undefined,

}