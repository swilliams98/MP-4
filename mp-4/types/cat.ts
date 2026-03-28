export type Cat = {
    id: string,
    url: string,
    width: number,
    height: number,
    breeds:
        {
            name: string,
            description: string,
            origin: string,
        }
}

