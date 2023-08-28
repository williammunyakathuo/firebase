import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { db, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


function App() {

  const [movies, setMovies] = useState([])
  const moviesRef = collection(db, "movies")
  const getMovies = async () => {
    try {
      const data = await getDocs(moviesRef);
      const filteredData = data.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }))

      setMovies(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovies()
  })
 
  const [newTitle, setNewtitle] = useState("")
  const [newDate, setNewDate] = useState(0)
  const [isOscar, setIsoscar] = useState(false)

  const submitMovie = async () => {
    try {
      await addDoc(moviesRef, {
        title: newTitle,
        realeaseDate: newDate,
        oscar: isOscar,
        userId: auth?.currentUser?.uid
      })
      getMovies()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  }

  const [updatedTitle, setUpdatedTitle] = useState()

  const updateTitle = async (id) =>{
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle});
   getMovies()
  }
  return ( 
    <div className="App">
      <Auth />
      <div className="add">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setNewtitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="date"
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input type="checkbox" onChange={(e) => setIsoscar(e.target.checked)} />
        <label htmlFor="Oscar">Oscar</label>
        <button onClick={submitMovie}>Submit</button>
      </div>
      {movies && movies.map((movie) => (
        <div className="movies" key={movie.id}>
          <h2 style={{ color: movie.oscar ? "green" : "red" }} >{movie.title}</h2>
          <p>{movie.realeaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete</button>

          <input
            type="text"
            placeholder='new title'
            onChange={(e) => setUpdatedTitle(e.target.value)} />
          <button onClick={() =>updateTitle(movie.id)} >Update title</button>
        </div>

      ))}

    </div>
  );
}

export default App;
