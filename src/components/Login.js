import React from 'react'
import API from '../helpers/API'
import config from '../configs/api.configs.json'

class Login extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        formdata : {
            username:'',
            password : ''
        },
        isRequest: false
    }
    this.onSignIn = this.onSignIn.bind(this)
    this.textChanged = this.textChanged.bind(this)
}
    textChanged(e){
        let tmp = this.state.formdata 
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata:tmp
        })
    }

    async onSignIn() {
        this.setState({
            isRequest: true
        })
        let result = await API.login(this.state.formdata.username, this.state.formdata.password)

        if(result.code === 200){
            localStorage.setItem(config.LS.USERDATA, JSON.stringify(result.message.userdata))
            localStorage.setItem(config.LS.TOKEN, result.message.token)
            this.props.history.push('/home')
        }else{
            alert(result.message)
        }
        this.setState({

            isRequest: false
        })
    }
    render(){
        return(
            <center><div class="login-box " >
            <div class="login-logo">
              <a href="../../index2.html">
                <b>220</b> JavaScript
              </a>
            </div>
            <div class="card">
              <div class="card-body login-card-body">
                <form>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      required=""
                      autoFocus=""
                      value={this.state.username}
                      onChange={this.textChanged}
                    />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-user"></span>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      required=""
                      value={this.state.password}
                      onChange={this.textChanged}
                    />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <div class="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label for="remember">Remember Me</label>
                      </div>
                    </div>
                    <div class="col-4">
                      <button
                        type="button"
                        class="btn btn-primary btn-block"
                        disabled={this.state.isRequest}
                        onClick={this.onSignIn}
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
    
                {/* <div class="social-auth-links text-center mb-3">
                  <p>- OR -</p>
                  <a href="#" class="btn btn-block btn-primary">
                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                  </a>
                  <a href="#" class="btn btn-block btn-danger">
                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                  </a>
                </div> */}
    
                {/* <p class="mb-1">
                  <a href="#">I forgot my password</a>
                </p>
                <p class="mb-0">
                  <a href="#" class="text-center">
                    Register
                  </a>
                </p> */}
              </div>
            </div>
          </div>
          </center>
        )
    }
}
export default Login