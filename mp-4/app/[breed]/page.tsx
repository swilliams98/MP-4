"use client";


import CatCard from "../components/catCard";
import styled from "styled-components";
import {Cat} from "@/types/cat";
import {useParams} from "next/navigation";
import useSWR from "swr";

const CatContentWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    margin: auto;
    background-color: #aba1fa;

`;

const CatName = styled.h1`
    color: blueviolet;
`;

const CatCardsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    border: #4d30b1 5px solid;
`;

export default function CatPage() {
    const params = useParams<{ breed: string }>();
    const { data, error } = useSWR( `/api/getCatData?breed=${params.breed}`,
        (url) => fetch(url).then((res) => res.json())
    );
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const cats = data || [];
    return (
        <CatContentWrapper>
            <CatName>{data ?  "Pictures of " + data[0]?.breeds[0]?.name +" Cats :D": "No results found :,("}</CatName>
            <CatCardsContainer>
                {
                    cats.map((cat: Cat, i: number) =>
                        (
                            <CatCard
                                key={i}
                                id={cat.id}
                                url={cat.url}
                                width={cat.width}
                                height={cat.height} breeds={{
                                name : cat.breeds.name,
                                description: cat.breeds.description,
                                origin: cat.breeds.origin,
                            }}
                            />
                        )
                    )
                }
                </CatCardsContainer>
        </CatContentWrapper>
    );
}
