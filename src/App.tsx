import './App.css'
import { useState } from 'react'

function App() {
  
    interface Movie {
    id: number;
    title: string;
    rating: number;
    year: number;
    favourite: boolean;
    loading: boolean;
    error: string;
    }
  
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Artur Wagner',
      rating: 5,
      year: 1999,
      favourite: false,
      loading: false,
      error: '',
    },
    {
      id: 2,
      title: 'The Rise',
      rating: 4.3,
      year: 2022,
      favourite: false,
      loading: false,
      error: '',
      
    },
    {
      id: 3,
      title: 'The Ragnarok',
      rating: 5,
      year: 2025,
      favourite: false,
      loading: false,
      error: '',
    },
    {
      id: 4,
      title: 'The Glory',
      rating: 5,
      year: 2026,
      favourite: false,
      loading: false,
      error: '',
    },
    {
      id: 6,
      title: 'Brasil',
      rating: 3,
      year: 2005,
      favourite: false,
      loading: false,
      error: '',
    },

  ];

  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState(mockMovies);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  


  console.log(movies);

  function handleFavourite(id: number) {
    const updated = movies.map((m) => m.id === id ? {...m, favourite: !m.favourite} : m)

    setMovies(updated);
    console.log(movies)
  }

  function getMovieAverage(movies: Movie[]): number {
    if (movies.length === 0) return 0;

    const total = movies.reduce((acc, m) => acc + m.rating, 0)

    return total / movies.length
  }

  async function getMovie() {
    
    try{
    setLoading(true);
    setError(null);

      const response = await fetch('url/fake');
      if (!response.ok) throw new Error('Erro na resposta da API');

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error searching for movies')
    } finally {
    setLoading(false);
  }
}
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Movie Explorer</h1>
        <p>Only the best movies</p>
      </header>

      <main className="app-main">
        <div className="search-box">
          <input value={movieName} onChange={(e) => setMovieName(e.target.value)} type="text" placeholder="Search movies..." />
          <select value={rating ?? ""} onChange={(e) => setRating(e.target.value)} id="rating-select">
            <option value="">⭐</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Search</button>
        </div>

        <div className="movie-grid">
        {movies.filter((m) => m.title.toLowerCase().includes(movieName.toLowerCase()) && (rating  === '' || m.rating >= Number(rating))).map((m) => (
        <div key={m.id} className="movie-card">
       <strong>{m.title}</strong><br />
        ⭐ {m.rating} | {m.year}
        <div className="buttton-div"><button className={m.favourite ? 'fav-movie' : ''} onClick={() => handleFavourite(m.id)} >❤︎</button></div>
    </div>
))} 

{/*Pensa assim: filtra de acordo com o que digita dai renderiza --- Tem isso? Se sim, RENDERIZA*/}

        </div>
      </main>
        <div className="average">
    <p>Movie Average: {getMovieAverage(movies).toFixed(1)}⭐ </p>
        </div>
      <footer className="app-footer">
        <p>Made by Artur Wagner ⚡</p>
      </footer>
    </div>
  )
}

export default App
