import React, { Component } from 'react'

//Using bootstrap framework to create Footer. bootstrap.css is imported in App.js

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2018 @in28minutes</span>
            </footer>
        )
    }
}

export default FooterComponent