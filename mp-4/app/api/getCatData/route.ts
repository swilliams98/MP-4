import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

const API_KEY = process.env.API_KEY;

export async function GET(request:Request): Promise<NextResponse>{
    const {searchParams} = new URL(request.url);
    const breed = searchParams.get("breed");
    console.log(breed);
    if(!breed){
        return NextResponse.json({error: "No [breed] provided"}, {status:400});
    }

    const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${breed}`,
        {
            headers:{"x-api-key":API_KEY as string,},
        }

    );

    // If the API request fails (status code other than 200), return a 500 Internal Server Error response
    if(res.status !== 200){
        return NextResponse.json({error: "Failed to fetch data"}, {status:500});
    }

    // Parse the JSON data from the API response
    const data = await res.json();

    // Return the parsed data in the response as JSON
    return NextResponse.json(data);
}

