import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import linkifyhtml from 'linkifyjs/html';

/* Import Actions */
import { showModal } from '../../actions/dialogs/dialogActions';
import likePublications from '../../actions/publications/likes/likePublicationActions';

/* Import Utils */
import formatDate from '../../utils/formatDate/formatDate';
import recognizeMentions from '../../utils/mentions/recognizeMentions';
import { recognizeEmojis } from '../../utils/emojis/recognizeEmojis';

class userPublications extends Component {
    componentDidMount() {
        let publications = this.props.publications;

        publications.forEach((publication) => {
            if (publication.i_like) {
                document.getElementById("like-icon-" + publication.unique_id).style.color = "blue";
                document.getElementById("likes-count-" + publication.unique_id).style.color = "blue";                
            } else {
                document.getElementById("like-icon-" + publication.unique_id).style.color = "white";
                document.getElementById("likes-count-" + publication.unique_id).style.color = "white";
            }
        })
    }

    userIsLogged = () => {
        if (localStorage.username === this.props.username) 
            return true;
        else 
            return false;
    }

    moreOptions = (index) => {
        if (this.userIsLogged()) {
            let element = document.getElementsByClassName("profile-publications-item-config-icon-options");
            Array.from(element);
            let profileConfigIcon = element[index];
            profileConfigIcon.classList.remove("profile-photo-options-show");
        }
    }

    toggleOptions = (index, event) => {
        event.preventDefault();
        let element = document.getElementsByClassName("profile-publications-item-config-icon-options");
        Array.from(element);
        let profileConfigIcon = element[index];
        profileConfigIcon.classList.toggle("profile-photo-options-show");
    }

    editPublication = (event, publication) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.dispatch(showModal('UPDATE_PUBLICATION', publication));
    }

    deletePublication = (event, publication) => { 
        event.stopPropagation();
        event.preventDefault();
        this.props.dispatch(showModal('DELETE_PUBLICATION', publication))
    }

    likeUnlike = (event, id) => {
        event.preventDefault();
        this.props.dispatch(likePublications(id));
    }

    recognizeElements = (publication) => {
        if (publication.content.length > 190) 
            return linkifyhtml(recognizeEmojis(recognizeMentions(publication.content.substring(0, 189))));
        else 
            return linkifyhtml(recognizeEmojis(recognizeMentions(publication.content)));
    }

	render() {
        let publications = this.props.publications;
		return (
            <div className="profile-publications">
                {publications.length > 0 ?
                    publications.map((publication, index) => {
                        return (    
                            <Link 
                            to={"/profile/" + this.props.username + "/publication/" + publication.unique_id}
                            onClick={() => this.props.dispatch(showModal('GET_PUBLICATION', publication.unique_id))}
                            style={{color: 'inherit'}}
                            className="profile-publications-item" 
                            key={publication.unique_id}
                            onMouseLeave={() => this.moreOptions(index)}> 

                                {(typeof(publication.image) === 'string') ? 
                                    <img className="profile-publications-item-img" src={"data:image/png;base64," + publication.image} alt="" /> : 
                                    <div className="profile-publications-item-only-text">
                                        <div 
                                        style={{'fontSize': '20px'}} 
                                        dangerouslySetInnerHTML={{__html: `<p>${
                                            publication.content.length > 190 ? this.recognizeElements(publication) + "..." : this.recognizeElements(publication)}</p>`}
                                        } />                                   
                                    </div>
                                }
                                                
                                <div className="profile-publications-item-config">
                                    {this.userIsLogged() ? <div className="profile-publications-item-config-icon profile-publications-item-config-icon-points"> 
                                        <i className="material-icons" title="Opciones" onClick={(event) => this.toggleOptions(index, event)}>more_vert</i>
                                        <div className="profile-publications-item-config-icon-options">
                                            <ul className="profile-publications-item-config-icon-options-list">
                                                <li className="profile-publications-item-config-icon-options-list-item" onClick={(event) => this.editPublication(event, publication)}>
                                                    Editar
                                                </li>
                                                <li className="profile-publications-item-config-icon-options-list-item" onClick={(event) => this.deletePublication(event, publication)}>
                                                    Eliminar
                                                </li>
                                            </ul>
                                         </div>
                                    </div> : null}

                                    <div className="profile-publications-item-config-icon profile-publications-item-config-icon-likes">
                                        <i className="material-icons" id={"like-icon-" + publication.unique_id} onClick={(event) => this.likeUnlike(event, publication.unique_id)}>thumb_up_alt</i>
                                        <p id={"likes-count-" + publication.unique_id}>{publication.likes_count}</p>
                                    </div>
                                    <div className="profile-publications-item-config-icon profile-publications-item-config-icon-comments">
                                        <i className="material-icons" title="Comentarios">question_answer</i>
                                    </div>
                                    <div className="profile-publications-item-config-icon profile-publications-item-config-icon-date">
                                        <p className="profile-publications-item-config-icon-date-text">{formatDate(publication.datetime)}</p>
                                    </div>

                                </div>
                            </Link>
                        )
                    })
                : <p>No contiene publicaciones</p>}
            </div>
		);
	}
}

export default connect()(userPublications);