import { CountryTable } from './components/CountryTable';
import { useSearchParams } from 'next/navigation';
import { getData } from './utils/getData';


export default async function Home() {
  const data = await getData()
  const germanyData = data.countries.find(entry => entry.country === 'Germany')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        COL index and wages for {data.salaryBeforeTax} euro
      </header>
      <div>
        <p>Money after tax: {germanyData?.netPay}</p>
        <p>Money after expenses: {(Number(germanyData?.netPay.replaceAll(/\D/g, '') ?? 0)) - 12 * 1500}</p>
        <p>Money after all: {(Number(germanyData?.netPay.replaceAll(/\D/g, '') ?? 0)) - 12 * 2500}</p>
      </div>
      <CountryTable countries={data.countries} />
    </main>
  )
}
