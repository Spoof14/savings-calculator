'use client'
import React, { useState } from 'react'
import { TableData } from '../utils/types'
import { getSortBy } from '../utils/utils'





type CountryTableProps = { countries: TableData[] }
type TableDataKey = keyof TableData
const headers: [TableDataKey, string][] = [
    ['country', 'Country'],
    ['continent', 'Continent'],
    ['averageTax', 'Tax'],
    ['averageCol', 'COL'],
    ['netPay', 'Net pay'],
    ['expenses', 'Expenses'],
    ['rent', 'Rent'],
    ['moneyAfterAll', 'Money']
]
export const CountryTable = ({ countries }: CountryTableProps) => {
    const [sortKey, setSortKey] = useState<keyof TableData>('netPay');
    const [ascending, setAscending] = useState(false);

    const onClick = (newSort: keyof TableData) => {
        if (newSort === sortKey) setAscending(oldVal => !oldVal)
        setSortKey(newSort)
    }
    const sortByFunc = getSortBy(ascending, sortKey)
    const sortedData = countries.slice().sort(sortByFunc)

    return (
        <table className=' flex-col justify-between flex-1 w-full'>
            <thead>
                <tr>
                    {headers.map(([key, text]) =>
                        <th key={key} className='hover:cursor-pointer border-r' onClick={() => onClick(key)}>{text}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    sortedData.map((data) =>
                        <tr className='even:bg-slate-900 p-4' key={data.country}>
                            {headers.map(([key, text]) => <td key={key} className='p-2' >{data[key]}</td>)}
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
