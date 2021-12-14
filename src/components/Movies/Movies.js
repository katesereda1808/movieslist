import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from '../redux/store';

class Movies extends Component {
    state = { 
        searchLine: [],
        movies:[],
    }
    componentDidMount(){
        store.subscribe(()=>{
            const globalState=store.getState();
                fetch(`http://www.omdbapi.com/?apikey=f9664335&s=${globalState.searchLine}`)
                .then(resp=>{
                    return resp.json();
                })
                .then(data=>{
                    data.response===false?
                    this.setState({movies: 0}):
                    this.setState({movies: data.Search});
                })
                .catch((error) => {
                    console.error('Error:', error);
                    })
        })
    }

    render() { 
        return (
            <>
                {this.state.movies?
                    <ul className="movies">
                        {this.state.movies.map((movie) => (
                            <li className="movies__item" key={movie.imdbID}>
                            <MovieItem {...movie} />
                            </li>
                        ))}
                    </ul>:
                    <h1>По запросу ничего не найдено</h1>
                }
            </>
        );
    }
}
 
export default Movies;