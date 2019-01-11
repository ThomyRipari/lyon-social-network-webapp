import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Import Actions */
import { findUsers, clearSearch } from '../../actions/users/searchUsersActions';

/* Loader */
import Loader from '../loader/loader';

class searchUsers extends Component {
	state = {searchText: ''};

	search = (event) => {
		let { searchDialog } = this.refs;
		searchDialog.classList.add('dropdown-dialog-show');
		document.body.classList.add('scrollbar-hidden-nav');

		this.setState({searchText: event.target.value});

 		if (event.target.value) {
 			this.props.dispatch(findUsers(event.target.value));
 		} else {
 			this.props.dispatch(clearSearch());
 		}
	}

	onClickDialog = () =>  {
		let { searchDialog } = this.refs;
		this.props.dispatch(clearSearch());	
		searchDialog.classList.remove('dropdown-dialog-show');
		document.body.classList.remove('scrollbar-hidden-nav');
    }

    clearInput = () => {
		let { searchDialog } = this.refs;
		this.props.dispatch(clearSearch());
		this.setState({searchText: ''});
		searchDialog.classList.remove('dropdown-dialog-show');	
		document.body.classList.remove('scrollbar-hidden-nav');
    }
	
	render() {
		return (
			<div className="search">
				<div className="search-input-container">
					<input type="text" className="search-input input" placeholder="Buscar" value={this.state.searchText} onChange={this.search} onClick={this.search} />
					{this.props.loading ? 
						<div className="search-results" ref="searchResults">
							<div className="mini-loader">
								<Loader />
							</div>
						</div> : null}
					<div className="clear-icon-container" onClick={this.clearInput}><i className="material-icons clear-icon clear-icon-search">clear</i></div>
				</div>
				<div className="search-results" ref="searchResults">
					{this.props.foundUsers ? 
						<div>
							{this.props.numberOfResults ? 
								<div className="search-results-quantity">
									{this.props.numberOfResults === 1
									? <span className="search-results-quantity-text">1 Resultado</span> 
									: <span className="search-results-quantity-text">{this.props.numberOfResults} Resultados</span>}
								</div>
							: null}

							{this.props.foundUsers.map(found_user => {
								return (
									<Link onClick={this.clearInput} to={{pathname: '/profile/' + found_user.username}} key={found_user.id}>
									    <div className="search-results-found">
											<div className="search-results-found-content">
												<div className="search-results-image-container"> 
													<img className="search-results-image" width="100" height="100" src={"data:image/png;base64," + found_user.profile_image} alt="" />
												</div>
												<div className="search-results-text">
													<h2 className="search-results-name">{found_user.name}</h2>
													<h3 className="search-results-username">{found_user.username}</h3>
												</div>
											</div>
										</div>
									</Link>
								)
							})}
						</div>
						: null}
						{(!this.props.loading && !this.props.foundUsers) ? <div className="search-results-found"><p className="search-results-none">No hay resultados</p></div> : null}
				</div>
				<div ref="searchDialog" onClick={this.onClickDialog}></div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state.searchUsers;
}

export default connect(mapStateToProps)(searchUsers);