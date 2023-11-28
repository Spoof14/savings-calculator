'use client';
import React, { useState } from 'react';
import { Columns, TableData } from '../utils/types';
import { getSortBy } from '../utils/utils';
import { headers } from '../utils/const';



export type CountryTableProps = { countries: TableData[]; columns: Columns }


export const CountryTable = ({ countries, columns }: CountryTableProps) => {
    const [sortKey, setSortKey] = useState<keyof TableData>('netPay');
    const [ascending, setAscending] = useState(false);

    const onClick = (newSort: keyof TableData) => {
        if (newSort === sortKey) setAscending((oldVal) => !oldVal);
        setSortKey(newSort);
    };
    const sortByFunc = getSortBy(ascending, sortKey);
    const sortedData = countries.slice().sort(sortByFunc);

    const visibleHeaders = headers.filter(([header]) => columns[header] !== false);

    return (
        <table className='w-full'>
            <thead>
                <tr>
                    {visibleHeaders.map(([key, text]) =>
                        <th key={key} className='hover:cursor-pointer border-r' onClick={() => onClick(key)}>{text}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    sortedData.map((data) =>
                        <tr className='even:bg-slate-900 p-4' key={data.country}>
                            {visibleHeaders.map(([key, text]) => <td key={key} className='p-2'>{data[key]}</td>)}
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};
