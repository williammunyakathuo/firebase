import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Add from './components/crud';

function App() {

  const [movies, setMovies] = useState([])
  const moviesRef = collection(db, "movies")

  useEffect(() =>{
    const getMovies = async () =>{
      try {
        const data = await getDocs(moviesRef);
        const filteredData = data.docs.map((doc) =>(
          {...doc.data(), 
          id: doc.id}))

          setMovies(filteredData)
      } catch (error) {
        console.log(error)
      }
    }

    getMovies()
  }, [])
 console.log(movies)
  return (
    <div className="App">
      <Auth/>
      {movies && movies.map((movie) =>(
        <div className="movies" key={movie.id}>
          <h2 style={{color: movie.oscar ? "green" : "red"}} >{movie.title}</h2>
          <p>{movie.realeaseDate}</p>
        </div>
      ))}
        <Add/>
    </div>
  );
}

export default App;
