

import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type SelectProps = {
    label?: string;
    labelPosition?: 'top' | 'left'
} & DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
export const Select = ({label, labelPosition = 'top', children, ...rest }: SelectProps) => {
    
    return (<div className={`flex gap-1 ${labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
        <label>{label}</label   >
        <select className='p-2 rounded-sm bg-slate-900' {...rest}>
            {children}
        </select>
    </div>
    )
}
