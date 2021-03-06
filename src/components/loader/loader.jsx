import React, { Component } from 'react';

class loader extends Component {
	render() {
		return (
            <div className="load-container">
                <div className="showbox">
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                        </svg>
                    </div>
                </div>
            </div>
		);
	}
}

export default loader;