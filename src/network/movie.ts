
export interface FetchMoviePayload {
  keyword: string
  page: number
}

export interface Movie {
  Title: string
  Year: number
  imdbID: string
}

export interface MovieResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Movie[]
}

export function fetchMovie ({ keyword, page }: FetchMoviePayload = { keyword: '', page: 1}): Promise<MovieResponse> {
  const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${keyword}&page=${page}`
  return fetch(url)
    .then(response => response.json())
    .catch(_ => {
      return {
        page: 0,
        per_page: 0,
        total_pages: 0,
        data: []
      }
    })
}
