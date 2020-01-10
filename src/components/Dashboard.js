import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import home from '../components/home'
import user from '../components/content/user'
import mahasiswa from './content/mahasiswa'
import contoh from './contoh'
import {Redirect} from 'react-router'
import apiconfig from '../configs/api.configs.json'
import ListModal from './content/listModal'

class Dashboard extends React.Component{
    render(){
        return(
            <div class ="wrapper">
                <Header />

                  <Sidebar />

                    <div class = "content-wrapper">
                    <section class="content">
                    <div class="container-fluid">
                        <Switch>
                            <PrivateRoute exact path = '/home' component ={home} />
                            <PrivateRoute exact path = '/user' component ={user}/>
                            <PrivateRoute exact path = '/mahasiswa' component ={mahasiswa}/>
                            <PrivateRoute exact path = '/contoh' component ={contoh}/>
                            <PrivateRoute exact path = '/listModal' component ={ListModal}/>
                        </Switch>
                    </div>
                </section>
                </div>

                {/* <Footer /> */}
           </div>
        )
    }
}

const PrivateRoute = ({ component : Component, ...rest}) => (
    <Route
    {...rest}
    render={props =>
        localStorage.getItem(apiconfig.LS.TOKEN)!=null? (
            <Component {...props}/>
        ):(
            <Redirect
            to={{
                pathname: "/",
                state: { from: props.location}
            }}
            />
        )
    }
    />
);

export default Dashboard