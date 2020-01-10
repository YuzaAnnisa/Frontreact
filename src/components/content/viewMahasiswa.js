import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'

class ViewMahasiswa extends React.Component{

    render(){
        return(
            <Modal isOpen={this.props.view} className={this.props.className}>
                <ModalHeader>View Unit</ModalHeader>
                <ModalBody>

                <form role="form">
                    <div class ="form-group">
                        <label for="text"> Kode Mahasiswa </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_mahasiswa" 
                        value={this.props.listmahasiswa.kode_mahasiswa} 
                         />
                        <label for="text"> Nama Mahasiswa : </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" readOnly
                        name="nama_mahasiswa" 
                        value={this.props.listmahasiswa.nama_mahasiswa} 
                         />
                    </div>
                
                    <div class ="form-group"> 
                    <label for="text"> Alamat </label>
                        <input type="text" class="form-control" placeholder="alamat" readOnly
                        name="alamat" 
                        value={this.props.listmahasiswa.alamat} 
                        />
                    <label for="text"> Agama </label>
                        <input type="text" class="form-control" placeholder="Type religion" readOnly
                        name="kode_agama" 
                        value={this.props.listmahasiswa.kode_agama} 
                        />
                    </div>
                    
                    <div class ="form-group">
                    <label for="text"> Jurusan </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="kode_jurusan" 
                        value={this.props.listmahasiswa.kode_jurusan} 
                        />
                     <label for="text"> Jenis Kelamin </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="jk" 
                        value={this.props.listmahasiswa.jk} 
                    />
                   </div>
                   <div class ="form-group">
                    <label for="text"> Kota </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="kode_kota" 
                        value={this.props.listmahasiswa.kode_kota} 
                        />
                     <label for="text"> Provinsi </label>
                        <input type="text" class="form-control" placeholder="phone" readOnly
                        name="kode_prov" 
                        value={this.props.listmahasiswa.kode_prov} 
                    />
                   </div>
                   <div class="form-group">
                            <label for="exampleInputEmail1">Hobi</label>
                            <input type="text" 
                            class="form-control" 
                            placeholder="hobi" readOnly
                            name="hobi" 
                            value={this.props.listmahasiswa.hobi} 
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
export default ViewMahasiswa