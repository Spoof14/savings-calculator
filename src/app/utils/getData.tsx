import { load } from 'cheerio';
import colData from '../data/colData.json';
import { TableData } from './types';

const baseUrl = 'https://de.talent.com/ajax/taxcal/best-of-countries.php?country=de&language=en'


type Data = {
    salaryBeforeTax: string;
    countries: TableData[]
}
export async function getData(salary = '66000'): Promise<Data> {
    let salaryString = salary ? `&salary=${salary}` : '';

    try {

        const continents = await Promise.all([
            fetch(baseUrl + '&continent=Asia-Pacific' + salaryString),
            fetch(baseUrl + '&continent=Europe' + salaryString)
        ])
            .then(async (responses) => await Promise.all(responses.map(data => data.text())))
            .then(texts => {
                return texts.flatMap(continent => {

                    const $ = load(continent);
                    const continentName = $('.c-card--top').text().trim();
                    return $('.c-table__row').toArray().slice(1).map(item => [...$(item.children, 'c-table__td').text().trim().split('\n').map(text => text.trim()), continentName]
                    );
                });
            });

        const frankfurtCol = colData.find(({ city }) => city.includes('Frankfurt'))?.colIndex;
        const frankfurtRent = colData.find(({ city }) => city.includes('Frankfurt'))?.rentIndex;

        const countries = continents.map(data => {
            const [country, netPay, averageTax, bestRank, continent] = data;
            const colCities = colData.filter(({ city }) => city.includes(data[0]));
            const averageCol = (colCities.reduce((prev, cur) => prev + cur.colIndex, 0) / colCities.length).toFixed(1);
            const averageRent = (colCities.reduce((prev, cur) => prev + cur.rentIndex, 0) / colCities.length).toFixed(1);

            const netPayAsNumber = Number(netPay.replaceAll(/\D/g, ''));
            const expenses = (Number(averageCol) / Number(frankfurtCol)) * 12 * 1500;
            const rent = (Number(averageRent) / Number(frankfurtRent)) * 12 * 1000;
            const moneyAfterExpenses = Math.round(netPayAsNumber - expenses);
            const moneyAfterRent = Math.round(netPayAsNumber - rent);
            const moneyAfterAll = Math.round(netPayAsNumber - rent - expenses);


            return { country, netPay, averageTax, bestRank, continent: continent, averageCol, moneyAfterExpenses, moneyAfterRent, moneyAfterAll };
        });
        return { salaryBeforeTax: salary, countries }
    } catch (error) {
        console.error('fetch error', error)
        return { salaryBeforeTax: salary, countries: [] }
    }
}
