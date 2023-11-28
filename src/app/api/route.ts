import { NextRequest } from 'next/server';
import { getData } from '../utils/getData';

export async function GET({ nextUrl }: NextRequest) {
    const salary = nextUrl.searchParams.get('salary') || undefined;
    const data = await getData(salary);

    return Response.json(data);
}