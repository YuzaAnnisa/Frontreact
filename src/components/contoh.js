import React from 'react'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Select from "react-select";
import {Modal,ModalBody,ModalFooter,ModalHeader,Button} from 'reactstrap'
import axios from 'axios'
import apiconfig from '../configs/api.configs.json'
import swal from 'sweetalert2'


class Contoh extends React.Component {
//cara ambil username biar muncul di seperti session 
//get.username.localStorage
  alertHandler() {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  render(){
    
    return (
      <button class="show-example-btn" aria-label="Try me! Example: A title with a text under" 
      onClick={this.alertHandler}>
          Try me!
        </button>
    )
  }
  
//   constructor(props){
//     super(props)

//     this.state = {
//         formdata: {
//             kode_mahasiswa: '',
//             nama_mahasiswa: '',
//             alamat: '',
//             kode_agama: '',
//             kode_jurusan:''
           
//         }
//     }
//     this.submitHandler = this.submitHandler.bind(this)
//     this.changeHandler = this.changeHandler.bind(this)
// }

//   submitHandler = event => {
//     event.preventDefault();
//     event.target.className += " was-validated";
//     if(event=="invalid"){
      
//     }
//     else{
//       console.log("sukses")
//     }
//     // let token = localStorage.getItem(apiconfig.LS.TOKEN)
//     //     let option = {
//     //         url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
//     //         method: "post",
//     //         headers: {
//     //           "authorization": token ,
//     //           "Content-Type" : "application/json"   //case-sensitve
//     //         },
//     //         data: this.state.formdata
//     //       }
          
//     //       axios(option)
//     //       .then((response) => {
//     //           if(response.data.code === 200){
                  
//     //               alert('Succsses')
//     //               this.props.modalStatus()
//     //           } else{
//     //               alert(response.data.message)
//     //           }
//     //       })
//     //       .catch((error) =>{
//     //           console.log(error);
//     //     })  
//   };

//   changeHandler = event => {
//     // this.setState({ [event.target.name]: event.target.value });
//     let tmp = this.state.formdata
//         tmp[event.target.name]= event.target.value
//         this.setState({
//             formdata:tmp
//         })
//   };
//     render(){
//       const options1 = this.state.listProvinsi;
//       const options2 =this.state.listKota;

//       const filteredOptions = options2.filter(
//       o => o.link === this.state.selectedOption.value)
//         return(
//           <div>
//         <Modal isOpen = {this.props.create} className={this.props.className}>
//                  <ModalHeader>ADD Mahasiswa </ModalHeader>
//             <ModalBody>
//             <form role = "form">
//                 <div class ="form-group">
//                     <label for="text"> Kode Mahasiswa : </label>
//                     <input type="text" class="form-control" 
//                     name="kd_mhs" 
//                     value={this.state.formdata.kd_mhs} 
//                     onChange={this.changeHandler}
//                      />
//                      </div>
//                      <div class ="form-group">
//                     <label for="text"> Nama Mahasiwa : </label>
//                     <input type="text" class="form-control" placeholder="Type Name" 
//                     name="nm_mhs"
//                     value={this.state.formdata.nm_mhs} 
//                     onChange={this.changeHandler}
//                      />
//                  </div>
//                      <div class ="form-group">
//                 <label for="text"> Jenis Kelamin: </label>
//                     <input type="text" class="form-control" placeholder="Jenis Kelamin" 
//                     name="jk"
//                     value={this.state.formdata.jk} 
//                     onChange={this.changeHandler}
//                     />
//                      </div>
//                      <div class ="form-group">  
//                 <label for="text"> Alamat : </label>
//                     <input type="text" class="form-control" placeholder="Type address" 
//                     name="alamat"
//                     value={this.state.formdata.alamat} 
//                     onChange={this.changeHandler}
//                     />
//                 </div>
//                      <div class ="form-group">
//                 <label for="text"> Kode jurusan : </label>
//                     <input type="text" class="form-control" placeholder="Jurusan" 
//                     name="kd_jurusan" 
//                     value={this.state.formdata.kd_jurusan} 
//                     onChange={this.changeHandler}
//                     />
//                      </div>
//                      <div>
//                      <label for="text"> Pilih Provinsi : </label>
//                         <Select
//                         name=""
//                         value={this.state.selectedOption.kd_prov}
//                         onChange={this.handleChange1}
//                         options={options1}
//                         />
//                         </div>
//                      <div class ="form-group"> 
//                     <label for="text"> Kota : </label>
//                         <Select type="text" class="form-control" placeholder="Pilih kota" 
//                         name="kd_kota" 
//                         value={this.state.selectedOption2.kd_kota} 
//                         //onChange={this.changeHandler}
//                         onChange={this.handleChange2}
//                         options={filteredOptions}
//                         />
//                    </div>
//                      {/* <div>
//                         <p>Pilih kota</p>
//                         <Select
//                         name="kd_kota"
//                         value={this.state.selectedOption2.kd_kota}
//                         onChange={this.handleChange2}
//                         options={filteredOptions}
//                         />
//                     </div> */}
//                 </form>
//                 </ModalBody>
//                 </Modal>
//       </div>
      
//     );
//   }


}

export default Contoh