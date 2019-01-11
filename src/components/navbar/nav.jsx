import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Import Components */
import SearchUsers from './searchUsers';
import AddPublication from '../publications/addPublication';
import SnackbarMessage from '../snackbar/snackbarMessage';

/* Import Utils */
import styleClasses from '../../utils/styleClasses/styleClasses';

/* Import Actions */
import { showModal } from '../../actions/dialogs/dialogActions';
import { logOut } from '../../actions/login/loginActions';
import { getProfileImage } from '../../actions/users/getProfileImageActions';

class nav extends Component {
    state = {profileImage: null, name: ''};

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);

        getProfileImage().then(profileImage => {
            this.setState({profileImage: profileImage});
        })

        styleClasses.hasScroll()
        window.addEventListener('resize', styleClasses.hasScroll);
        window.addEventListener('scroll', styleClasses.hasScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    navInputTranslate = () => {
       let { navSearch, navIcons } = this.refs;
       styleClasses.navInputTranslate(navSearch, navIcons);
    } 

    navInputBackTranslate = () => {
        let { navSearch, navIcons } = this.refs;
        styleClasses.navInputBackTranslate(navSearch, navIcons);
    }

    onClickDialog = () => {
		let { navOptions, navDialog, navIconOptionsContainer } = this.refs;		
        styleClasses.onClickDialog(navOptions, navDialog, 'flex');         
        navIconOptionsContainer.classList.remove('dropdown-z-index');
    }

    onClickNavIconOptions = () => {
        let { navOptions, navDialog, navIconOptionsContainer } = this.refs;
        styleClasses.onClickDropdownButton(navOptions, navDialog, 'flex');
        navIconOptionsContainer.classList.toggle('dropdown-z-index');
    }

    logOut = () => {
		this.props.dispatch(logOut());
		this.props.history.push('/login');
    }
    
    onScroll = () => {
        let scrollPosition = window.scrollY;
        let nav = document.querySelector('.nav-container');
        
        if (scrollPosition > 50) { return nav.classList.add('nav-container-scroll');
        } else if (scrollPosition === 0) { return nav.classList.remove('nav-container-scroll');
        } else { return undefined }
    }

    onClickSettingButton = () => {
        let settingsLocation = window.location.pathname;

        if (settingsLocation.includes('settings/')) {
            return '#';
        } else {
            return '/settings/username/edit'
        }
    }

    render() {
        return (
            <div className="nav-container">
                <nav className="nav">
                    <div className="nav-title">
                        <h1 className="nav-title-text">Lyon</h1>
                    </div>

                    <div className="nav-search" ref="navSearch">
                        <SearchUsers />
                        <div className="search-clear-icon" onClick={this.navInputBackTranslate}><i className="material-icons">keyboard_backspace</i></div>
                    </div>

                    <div className="nav-icons" ref="navIcons">
                        <i className="material-icons nav-icon nav-icon-search" onClick={this.navInputTranslate}>search</i> 
                        <i className="material-icons nav-icon" title="Añadir una Publicación" onClick={() => this.props.dispatch(showModal('ADD_PUBLICATION', null))}>add_circle_outline</i>    
                        <i className="material-icons nav-icon" title="Notificaciones (No Funciona)">notifications</i>

                        <div className="nav-icon-full-container" ref="navIconOptionsContainer">
                            <div className="nav-icon-container">
                               {this.state.profileImage ? <i className="nav-icon" title={localStorage.username}>
                                    <img onClick={this.onClickNavIconOptions} ref="navIconOptions" src={"data:image/png;base64," + this.state.profileImage} width="20" height="20" alt="" />
                                </i> : null}
                            </div>
                            <div className="nav-icon-options" ref="navOptions" onClick={this.onClickDialog}>
                                <Link to={"/profile/" + localStorage.username} className="nav-icon-options-link"><span className="nav-icon-options-text">Perfil</span></Link>
                                <Link to={this.onClickSettingButton()} className="nav-icon-options-link"><span className="nav-icon-options-text">Configuración</span></Link>
                                <Link to="/login" className="nav-icon-options-link" onClick={this.logOut}><span className="nav-icon-options-text">Salir</span></Link>
                            </div>
                        </div>

                    </div>
                </nav>

                {this.props.dialog.modalType === 'ADD_PUBLICATION' ? <AddPublication /> : null}
                {this.props.snackbar.show ? <SnackbarMessage message={this.props.snackbar.message} /> : null}
                
                <div ref="navDialog" onClick={this.onClickDialog}></div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    let { dialog, snackbar } = state;
    return { dialog, snackbar };
}

export default connect(mapStateToProps)(nav);