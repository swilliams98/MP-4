import styled from "styled-components";
import type {Cat} from "@/types/cat";

const CatCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    border: 1px solid black;
    margin: 1rem;
    width: 200px;
    border-radius: 10px;
`;



export default function CatCard(props:Cat){
    return(
        <CatCardWrapper className="cat-card">
            <img src = {props.url} alt ={props.breeds?.name || "Cat"}/>
        </CatCardWrapper>
    )
}

