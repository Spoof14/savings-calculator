'use client'
import React, { useState } from 'react'
import { TableData } from '../utils/types'



const sortByCountry = (a: TableData, b: TableData) => a.country > b.country ? 1 : -1
const sortByPay = (a: TableData, b: TableData) => a.netPay === b.netPay ? sortByCountry(a, b) : a.netPay > b.netPay ? 1 : -1
const sortBy = (a: TableData, b: TableData, ascending: boolean, key: keyof TableData) => {
    if (a[key] === b[key]) return sortByPay(a, b)
    if (ascending) return a[key] > b[key] ? 1 : -1
    return a[key] > b[key] ? -1 : 1
}

type CountryTableProps = { countries: TableData[] }
type TableDataKey = keyof TableData
const headers: [TableDataKey, string][] = [
    ['country', 'Country'],
    ['continent', 'Continent'],
    ['averageTax', 'Tax'],
    ['averageCol', 'COL'],
    ['netPay', 'Net pay'],
    ['moneyAfterExpenses', 'Money after expenses'],
    ['moneyAfterRent', 'Money after rent'],
    ['moneyAfterAll', 'Money']
]
export const CountryTable = ({ countries }: CountryTableProps) => {
    const [sortKey, setSortKey] = useState<keyof TableData>('netPay');
    const [ascending, setAscending] = useState(false);

    const onClick = (newSort: keyof TableData) => {
        if (newSort === sortKey) setAscending(oldVal => !oldVal)
        setSortKey(newSort)
    }
    const sortedData = countries.slice().sort((a: TableData, b: TableData) => sortBy(a, b, ascending, sortKey))

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
