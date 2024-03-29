import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        error: '',
        title: '',
        movies: []
    }
    
    componentDidMount() {
            const id = this.props.match.params.id;       
            if(id){
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(resp=>{
                if(resp.ok){
                    return resp.json();
                }else{
                    this.setState({error: 'Ошибка! Список не найден'})
                }
            })
            .then(data=>{
                if(data){
                    this.setState({movies: data.movies, title: data.title});
                } else {
                    this.setState({error: 'Ошибка! Список не найден'})
                }
                
            })
            .catch((error) => {
                console.error('Error:', error);
                })
            }else{
                this.setState({error: 'Ошибка! Список не найден'})
            }
    }
    render() { 
        const id = this.props.match.params.id;
        return (
                <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                {this.state.movies.length>0?
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.id}>
                                <a href={`https://www.imdb.com/title/${item.id}`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>:
                <p>{this.state.error}</p>
                }
                </div>
        );
    }
}
 
export default ListPage;