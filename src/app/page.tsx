'use client'

import { CountryTable } from './components/CountryTable';
import { Data } from './utils/getData';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home({ searchParams }: { searchParams: { salary?: string } }) {
	const { salary } = searchParams
	const { data } = useSWR<Data>(`/api${salary ? '?salary=' + salary : ''}`, fetcher)
	const germanyData = data?.countries.find((entry) => entry.country === 'Germany')

	if (!data) return null;

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<header>
				COL index and wages for {data?.salaryBeforeTax} euro
			</header>
			<div>
				<p>Money after tax: {germanyData?.netPay}</p>
				<p>Money after expenses: {(Number(germanyData?.netPay.replace(/\D+/g, '') ?? 0)) - 12 * 1500}</p>
				<p>Money after all: {(Number(germanyData?.netPay.replace(/\D+/g, '') ?? 0)) - 12 * 2500}</p>
			</div>
			<CountryTable countries={data.countries} />
		</main>
	)
}
