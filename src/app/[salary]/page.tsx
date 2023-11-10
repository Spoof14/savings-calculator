import { CountryTable } from "../components/CountryTable"
import { getData } from "../utils/getData"

export async function generateStaticParams() {
    const salaries = ['66000', '75000', '100000', '170000']
    const data = await Promise.all(salaries.map(salary => getData(salary)))

    return salaries.map((salary) => ({
        salary,
    }))
}

export default async function Page({ params: { salary } }: { params: { salary: string } }) {
    const data = await getData(salary)
    const germanyData = data.countries.find(entry => entry.country === 'Germany')

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <header>
                COL index and wages for {salary} euro
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