import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewUser extends React.Component{

    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Mahasiswa</ModalHeader>
                <ModalBody>

                <form role="form">
                    <div class ="form-group">
                        <label for="text"> UserId </label>
                        <input type="text" class="form-control" readOnly
                        name="id" 
                        value={this.props.listuser.id} 
                         />
                        <label for="text"> Username </label>
                        <input type="text" class="form-control" placeholder="username" readOnly
                        name="username" 
                        value={this.props.listuser.username} 
                         />
                    </div>
                
                    <div class ="form-group"> 
                    <label for="text"> Password </label>
                        <input type="text" class="form-control" placeholder="password" readOnly
                        name="password" 
                        value={this.props.listuser.password} 
                        />
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color = "danger" onClick={this.props.modalStatus}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default ViewUser