import React from 'react'
import axios from 'axios'
import apiconfig from '../../configs/api.configs.json'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class DeleteMahasiswa extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formdata: {
                id: ''
            }
        }
            this.deleteHandler = this.deleteHandler.bind(this)   
    }

    componentWillReceiveProps(newProps){
        this.setState({
            formdata : newProps.listuser
        })
    }

    deleteHandler(){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER,
            method: "delete",
            headers: {
              "authorization": token ,
              "Content-Type" : "application/json"
            },
            data: this.state.formdata
          }
        axios(option)
        .then((response) =>{
            if(response.data.code == 200){
                alert("success")
                this.props.modalStatus()
            } else{
                alert("gagal")
                this.props.modalStatus()
            }
        })
        .catch((error) =>{   
        })  
    }

    render(){
        return(
            <Modal isOpen={this.props.delete} className = {this.props.className}>
                <ModalHeader>Delete User</ModalHeader>
                <ModalBody>
                <p> Yakin mau hapus data? </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.deleteHandler}>Yes</Button>
                    <Button color="warning" onClick={this.props.modalStatus}>No</Button>
                </ModalFooter>
            </Modal>
        )
    }

}
export default DeleteMahasiswa