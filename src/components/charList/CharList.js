import { Component } from 'react/cjs/react.production.min';
import MarverService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarverService();

    componentDidMount() {
        this.getCharacters();
    }

    onCharactersLoaded = (characters) => {
        this.setState({
            characters,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true
        })
    }

    getCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    }

    renderItems(chars) {        
        const listChars = chars.map((char) => {
            let imgStyle = {'objectFit':'cover'};
            if (char.thumbnail.includes('image_not_available.jpg')) {
                imgStyle = {'objectFit':'unset'};
            }
            
            return (
                <li key={char.id} className="char__item">
                    <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        })

        return (
            <ul className='char__grid'>
                {listChars}
            </ul>
        )
    }       
    

    render() {        
        const {characters, loading, error} = this.state;

        const listChars = this.renderItems(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? listChars : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;