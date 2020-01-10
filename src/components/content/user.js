import React from "react";
import apiConfig from '../../configs/api.configs.json';
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import ViewUser from "./ViewUser"
import CreateUser from './createUser'
import DeleteUser from './deleteUser'
import EditUser from './editUser'

class User extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: [],
            listuser: [],
            currentuser:{}
        }
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.createModalHandler=this.createModalHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    modalStatus(){
        this.setState({
          createUser : false,
          viewUser : false,
          deleteUser : false,
          editUser : false
        })
        this.getUser()
    }

    editModalHandler(id){
        this.state.user.map((ele) =>{
          if(id == ele.id){
            this.setState({
              currentuser : ele,
              editUser : true
            })
          }
        })
      }

    createModalHandler(){
        this.setState({
          createUser:true
        })
      }
    
    getUser() {
        let token = localStorage.getItem(apiConfig.LS.TOKEN);
        let option = {
          url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.USER,
          method: "get",
          headers: {
            "authorization": token
          }
        };
        axios(option)
          .then(response => {
            let tmp=[]
    
            response.data.message.map((row, x) =>{
              let kolom = <Link to='#'>
              <span onClick={() => {this.viewModalHandler(row.id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}}/>
              <span onClick={() => {this.editModalHandler(row.id)}} className="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />
              <span onClick={() => {this.deleteModalHandler(row.id)}} className="fa fa-trash" style={{fontSize : '18px'}} />
            </Link>
            tmp.push({"no": x+1, "id": row.id, "username": row.username, "password": row.password, action:kolom})
            })
            
            this.setState({
              listuser: tmp,
              user: response.data.message
            });
          })
          .catch(error => {
            alert(error);
          });
      }
    componentDidMount() {
        this.getUser();
    }

    viewModalHandler(id){
        let tmp ={}
        this.state.user.map((ele)=>{ //ele (elemen) atau row sma 
          if (id == ele.id){
            tmp = ele
          }
        })
        this.setState({
          currentuser : tmp,
          viewUser : true
        })
    }

    deleteModalHandler(id){
        this.state.user.map((ele) =>{
          if(id == ele.id){
            this.setState({
              currentuser : ele,
              deleteUser : true
            })
          }
        })
      }
    
    render(){
        const data = {
            columns: [
            {
                label :"No",
                field : "no",
                sort :"asc",
                width: 150
                },
            {
                label :"UserID",
                field : "id",
                sort :"asc",
                width: 150
              },
              {
                label: "Username",
                field: "username",
                sort: "asc",
                width: 150
              },
              {
                label: "Password",
                field: "password",
                sort: "asc",
                width: 270
              },
              {
                label : "Action",
                field : "action"
              }
            ],
            rows: this.state.listuser //DATA
        };
        return(
            <div>
        <div className="container">
        
        <button type="button" className="btn-primary float-right"
        onClick={this.createModalHandler}>Add</button>
        </div>
        < MDBDataTable striped
            bordered
            hover 
            data={data} />
        
        < ViewUser
            listuser = {this.state.currentuser}
            view = {this.state.viewUser}
            modalStatus = {this.modalStatus}
        />

        <CreateUser
         create={this.state.createUser}
         modalStatus={this.modalStatus}
      /> 
    
    < EditUser

      listuser = {this.state.currentuser}
      edit = {this.state.editUser}
      modalStatus = {this.modalStatus}
      />

      < DeleteUser
        listuser = {this.state.currentuser}
        delete = {this.state.deleteUser}
        modalStatus = {this.modalStatus}
    />

    </div>
        )
    }
}

export default User