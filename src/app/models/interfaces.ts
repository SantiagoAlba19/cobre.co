export interface usuarios{
    nombre: string ;
    celular : number;
    foto : string;
    pass : string ;
  }

export interface pelicula {
  adult: boolean;
  backdrop_path: string;
  genre: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  trailer?:string;
  calificacion? :number;
  votos? : number;
}



