'use client';

import { ChangeEventHandler, useState } from 'react';
import { CountryTable } from './components/CountryTable';
import { Data, TableData } from './utils/types';
import useSWR from 'swr';
import { headers } from './utils/const';
import { Columns } from './utils/types';
import { InputGroup } from './components/InputGroup';
import { Input } from './components/Input';
import { Select } from './components/Select';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home({ searchParams }: { searchParams: { salary?: string } }) {
    const [baselineCountry, setBaselineCountry] = useState('Germany');
    const [baselineRent, setBaselineRent] = useState('1000');
    const [baselineExpenses, setBaselineExpenses] = useState('1500');
    const [columns, setColumns] = useState<Columns>(() => {
        const columns: Columns = {};
        headers.slice(1).forEach(([key]) => columns[key] = true);
        return columns;
    });

    const { salary } = searchParams;
    const { data } = useSWR<Data>(`/api${salary ? '?salary=' + salary : ''}`, fetcher);
    const baselineData = data?.countries.find((entry) => entry.country === baselineCountry);

    const toggleColumns: ChangeEventHandler<HTMLInputElement> = (e) => {
        setColumns((prev: Columns) => ({ ...prev, [e.target.name]: !prev[e.target.name as keyof TableData] }));
    };
    if (!data) return <div>loading</div>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8 gap-4">
            <header>
				COL index and wages for {data?.salaryBeforeTax} euro
            </header>
            <div className='flex gap-4'>
                <InputGroup>
                    <Select label='Baseline Country' value={baselineCountry} onChange={(e) => setBaselineCountry(e.target.value)}>
                        {data.countries.map((country) => <option key={country.country} value={country.country}>{country.country}</option>)}
                    </Select>
                    <Input label='Baseline Expenses' value={baselineExpenses} onChange={(e) => setBaselineExpenses(e.target.value)} />
                    <Input label='Baseline Rent' value={baselineRent} onChange={(e) => setBaselineRent(e.target.value)} />
                </InputGroup>

                <div>
                    <p>Money after tax (Net pay): {baselineData?.netPay}</p>
                    <p>Expenses: {12 * 1500}</p>
                    <p>Rent: {12 * 1000}</p>
                    <p>Money after all: {(Number(baselineData?.netPay.replace(/\D+/g, '') ?? 0)) - 12 * 2500}</p>
                </div>
            </div>
            <div className='flex gap-6 flex-wrap'>
                {headers.slice(1).map(([key, value]) => (
                    <Input key={key}
                           label={value}
                           type='checkbox'
                           name={key}
                           checked={columns[key]}
                           onChange={toggleColumns}
                           className='items-center justify-between max-sm:flex-row '
                    />
                ))}
            </div>
            <CountryTable columns={columns} countries={data.countries} />
        </main>
    );
}
