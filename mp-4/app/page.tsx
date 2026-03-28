"use client";

import {useEffect} from "react";
import styled from "styled-components";
import {useState} from "react";
import Link from "next/link";
import {Breed} from "@/types/breed";

const StyledDiv=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #aba1fa;
    padding: 2%;
    border-radius: 5px;
    width: 50%;
`;
const PageWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    
`

const ButtonWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    width: 45%;
    padding: 1%;
    margin:2%;
    border-radius: 5px;
    background-color: #d0c1e6;
`
export default function Home() {
    //i wanted to make a map so that when the user clicks a breed option, it quickly finds the corresponding id to put in the request.

    const [breedMap, setBreedMap] = useState<Map<string, string>>(new Map());
    useEffect(()=>{
        fetch("https://api.thecatapi.com/v1/breeds")
            .then( res =>res.json())
            .then(data =>{
                const map = new Map<string,string>();
                data.map((breed : Breed)=>(map.set(breed.name.toLowerCase(),breed.id)))
                setBreedMap(map);
            });

    },[]);

    const [breed, setBreed] = useState("");
    return (
        <PageWrapper>
        <StyledDiv>
            <h1>Find Cat Pictures!</h1>
            <p><em>Copy and paste</em> a cat breed below to get pictures! The </p>
            <input type="text" value={breed} placeholder="Cat breed" onChange={(e) => {
                setBreed(e.target.value)
            }}/>
            <ButtonWrapper>
                <Link href={`/${breedMap.get(breed.toLowerCase())}`}>Get Cat Pictures!</Link>
            </ButtonWrapper>
        </StyledDiv>
        </PageWrapper>
    );
}
