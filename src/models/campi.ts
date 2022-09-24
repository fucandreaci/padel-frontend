export interface Campo {
    id: number,
    nome: string,
    immagine: string
}

export interface ResponseCampoDto extends RequestCampoDto{
    id: number,
}

export interface RequestCampoDto {
    nome: string,
    urlImmagine: string,
}