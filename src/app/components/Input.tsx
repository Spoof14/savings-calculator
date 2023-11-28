

import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = {
    label?: string;
    labelPosition?: 'top' | 'left';
    inputClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export const Input = ({ label, labelPosition = 'top', className, inputClassName, ...rest }: InputProps) => {
    // let defaultFlexDirection = 'max-sm:'
    return (<div className={`flex gap-1 ${labelPosition === 'top' ? 'flex-col' : 'flex-row' } ${className || ''}`}>
        {label && <label>{label}</label>}
        <input className={`p-2 rounded-sm bg-slate-900 ${inputClassName || ''}`} {...rest} />
    </div>
    );
};
