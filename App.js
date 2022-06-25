import './App.css';
import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';


const api= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const search_api= "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
  

const App=()=> {

  const[movies,setmovies]=useState([]);
  const[searchsomething,setsearch]=useState("");


  useEffect(()=>{
    fetch(api).then(res=>res.json()).then(data=>{
      setmovies(data.results);
    })
  
  },[]);

  const handler=(e)=>{
    e.preventDefault();

    if(searchsomething){
      console.log(searchsomething)
    fetch(search_api+searchsomething).then(res=> res.json()).then(data=>{ 
      setmovies(data.results);
      console.log(data.results)
  });
  setsearch("");
}
};

  const handlechange=(e)=>{
    setsearch(e.target.value);
  };

  return (
    <>
      <header>
      <form onSubmit={handler}>
      <input className="search" type="search" placeholder="search" value={searchsomething} onChange={handlechange}/>
      </form>
    </header>
        <div className="movie_container">
      {movies.length>0 && movies.map((movie)=>(
        <Movie key={movie.id} {...movie}/>
      ))}
    </div>
    </>
  );
}

export default App;
