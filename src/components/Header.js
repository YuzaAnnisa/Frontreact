import React from 'react'
import {Link} from 'react-router-dom'


class Header extends React.Component{
    constructor(props){
        super(props)
        this.OnSignOut = this.OnSignOut.bind(this)
    }
    OnSignOut(){

        localStorage.clear();
        //this.props.history.push('/')
    }
    render(){
        return(  
     <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="/Sidebar">
                    <i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a href="/home" class="nav-link">Home</a>
            </li>
        </ul>
        
        <ul class="navbar-nav ml-auto">
        <li class="nav-item d-none d-sm-inline-block">
            <Link className ="nav-link" to="" onClick={this.OnSignOut}>Sign Out</Link>
        </li>
        </ul>
    </nav>
   
        )
    }
}

export default Header