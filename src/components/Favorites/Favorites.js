import React, { Component } from 'react';
import './Favorites.css';
import store from '../redux/store';
import { Link } from "react-router-dom";

class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        listId:'',
        isClicked: false,
    }
    componentDidMount(){
        store.subscribe(()=>{
            const globalState=store.getState();
            this.setState({movies:globalState.favMovies});
        })
    }
    deleteFromFavs=(id)=>{
        store.dispatch({
            type: 'DELETE_FROM_FAVS',
            payload:{
                id: id,
            }
        })
    }
    getListId=(listId)=>{
        store.dispatch({
            type: 'GET_LIST_ID',
            payload:{
                listId: listId,
            }
        })
    }
    saveFavList=()=>{
        const data = this.state;
        this.setState({isClicked: true})
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        let listId = data.id;
        this.setState({listId: listId});
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
    handleChange=(e)=>{
        this.setState({title: e.target.value})
    }

    render() {
        return(
            <div className="favorites">
                 <input 
                value={this.state.title}
                onChange={this.handleChange}
                className="favorites__name" />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return <li key={item.id}>{item.title} ({item.year}) <button type="button" onClick={()=>this.deleteFromFavs(item.id)}>X</button></li>;
                    })}
                </ul>
                {this.state.isClicked?
                    <Link to={`/list/${this.state.listId}`}>
                        Перейти к списку
                    </Link>:
                    <button type="button" className="favorites__save" disabled={!this.state.title || !this.state.movies.length }
                    onClick={()=>this.saveFavList()}>
                        Сохранить список
                    </button>
                }
            </div>
        )
    }
}
 
export default Favorites;