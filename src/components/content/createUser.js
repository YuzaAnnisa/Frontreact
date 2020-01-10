import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../configs/api.configs.json'

class CreateUser extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            formdata: {
                id: '',
                username: '',
                password: ''
         
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp = this.state.formdata
        tmp[e.target.name]= e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER,
            method: "post",
            headers: {
              "authorization": token ,
              "Content-Type" : "application/json"   //case-sensitve
            },
            data: this.state.formdata
          }
          
          axios(option)
          .then((response) => {
              if(response.data.code === 200){
                  
                  alert('Succsses')
                  this.props.modalStatus()
              } else{
                  alert(response.data.message)
              }
          })
          .catch((error) =>{
              console.log(error);
          })  
    }
    render(){
        return(
            <Modal isOpen={this.props.create} className = {this.props.className}>
                <ModalHeader>Insert USER</ModalHeader>
                <ModalBody>
                <form role="form">
                    <div class ="form-group">
                        <label for="exampleInputEmail1"> UserID </label>
                        <input type="text" class="form-control" id="exampleInputEmail1" 
                        name="id" 
                        value={this.state.formdata.id} 
                        onChange={this.changeHandler}
                         />
                    </div>
                    <div class ="form-group">
                        <label for="text"> Nama   </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" 
                        name="username" 
                        value={this.state.formdata.username} 
                        onChange={this.changeHandler}
                        />
                    </div>
                
                    <div class ="form-group"> 
                    <label for="text"> Password </label>
                        <input type="password" class="form-control" placeholder="password" 
                        name="password" 
                        value={this.state.formdata.password} 
                        onChange={this.changeHandler}
                        />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.modalStatus}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}
export default CreateUser