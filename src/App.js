import React from 'react' 
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import apiconfig from './configs/api.configs.json'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component{
    render(){
        return(
            <Switch>
            <Route exact path='/' render={() => (
                // bila fungsinya null maka akan kembali ke login
                localStorage.getItem(apiconfig.LS.TOKEN)==null ? ( 
                    <Route exact path='/' component={Login} /> 
                    // titik dua itu else ternyata 
                ) : (

                    <Dashboard />

                )
            )} />
            <Dashboard />
            
            </Switch>
        )
    }
}
export default App