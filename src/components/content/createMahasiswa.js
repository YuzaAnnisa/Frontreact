import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from 'axios'
import apiconfig from '../../configs/api.configs.json'
import Select from "react-select";


class CreateMahasiswa extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            formdata: {
                kode_mahasiswa: '',
                nama_mahasiswa: '',
                alamat: '',
                kode_agama: '',
                kode_jurusan:'', 
                kode_kota: '',
                kode_prov: '',
                nameError: '',
                hobi : ''
            },
            provinsi: [],
            kota: [],
            listKota: [],
            listProvinsi: [],
            selectedOption:{},
            selectedOption2:{},
            productsList :[]
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    handleChange1 = (selectedOption) => {
      this.setState({selectedOption});
    };
  
    handleChange2 = (selectedOption) => {
      this.setState({selectedOption2: selectedOption })
    }
    
    onAddingItem = (i) => (event) => {
      this.setState((state, props) => {
        state.productsList[i].isChecked = !state.productsList[i].isChecked;
        return {
          productsList: state.productsList
        }
      })
    }
  
  getProvinsi() {
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
      let option = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.PROVINSI,
        method: "get",
        headers: {
          "authorization": token
        }
      };
  axios(option)
        .then(response => {
          let tmp = [];
  
          response.data.message.map(row => {
            tmp.push({
              value: row.kode_prov,
              label: row.nama_prov
            });
          });
          this.setState({
            listProvinsi: tmp,
            provinsi: response.data.message
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  
  getKota() {
      let token = localStorage.getItem(apiconfig.LS.TOKEN);
      let option = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.KOTA,
        method: "get",
        headers: {
          "authorization": token
        }
      }
      axios(option)
        .then(response => {
          let tmp = [];
  
          response.data.message.map(row => {
            tmp.push({
              value: row.kode_kota,
              label: row.nama_kota,
              link : row.kode_prov
            });
          });
          this.setState({
            listKota: tmp,
            kota: response.data.message
          });
         
        })
        .catch(error => {
          alert(error);
        });
    }

    validate() {

        let nameError = ""

        if (!this.state.formdata.kode_mahasiswa || !this.state.formdata.nama_mahasiswa || !this.state.formdata.alamat 
            || !this.state.formdata.kode_agama || !this.state.formdata.kode_jurusan || !this.state.formdata.jk
            ) {
            nameError = "Anda Harus Mengisi Semua Field"
        }

        if (nameError) {
            this.state.formdata.nameError = nameError
            // alert(nameError)
            return false
        }

        return true
    }

    changeHandler = event => {
        let tmp = this.state.formdata
        tmp[event.target.name]= event.target.value
        // tmp["kode_kota"]= this.state.selectedOption2.value
        // tmp["kode_prov"]= this.state.selectedOption.value
        // tmp["hobi"] = this.state.formdata
        this.setState({
            formdata : tmp
        })
    }

    submitHandler = event => {
        // let kota = this.state.selectedOption2.value
        // let tmp = this.state.formdata
        // tmp.kode_kota = kota
        // this.setState({
        //   formdata:tmp
        // })
        event.preventDefault();
        event.target.className += " was-validated";
        const isValid = this.validate()
        if (isValid == true ) {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        //checkbox hobi
        let selectedProductsArray = this.state.productsList.filter((product, i)=>{
          return product.isChecked});
        let kota = this.state.selectedOption2.value
        let prov = this.state.selectedOption.value
        let stringHobi = ''
        let tmp = this.state.formdata

      selectedProductsArray.map((row) => {
          if (stringHobi !== '') {
              stringHobi = stringHobi +', ' + row.name
          } else {
              stringHobi = row.name
          }
      })

      tmp['hobi'] = stringHobi
      tmp.kode_kota = kota
      tmp.kode_prov = prov
      
      this.setState({
          formdata : tmp
      })
        let option = {     
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
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
                  window.location.reload()
              } else{
                  alert(response.data.message)
              }
          })
          .catch((error) =>{
              console.log(error);
          })  
        }
    }
    componentDidMount() {
      this.getProvinsi();
      this.getKota();
    }

    componentWillReceiveProps(newProps) {
      this.setState({
          productsList : newProps.productsList
      })

  }

    render(){
      let {productsList} =  this.state;
      const options1 = this.state.listProvinsi;
      const options2 =this.state.listKota;

        const filteredOptions = options2.filter(
        o => o.link === this.state.selectedOption.value)
        
        return(
            <Modal isOpen={this.props.create} className = {this.props.className}>
                <ModalHeader>Insert Mahasiswa</ModalHeader>
                <ModalBody>
                <form role="form" 
                className="needs-validation" 
                onSubmit={this.submitHandler} 
                noValidate>
               
               <MDBRow >
                  <MDBCol  className="mb-4">
                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Kode Mahasiswa</label>
                    <input value={this.state.formdata.kode_mahasiswa} name="kode_mahasiswa" onChange={this.changeHandler} type="text"
                     id="defaultFormRegisterNameEx" className="form-control" placeholder="Kode Mahasiswa" required/>
                    <div className="invalid-feedback">Data harus diisi</div>
                  </MDBCol>
               </MDBRow>

              <MDBRow>
                <MDBCol className="mb-4">
                  <label htmlFor="defaultFormRegisterEmailEx2" className="grey-text" >Nama Mahasiswa</label>
                  <input value={this.state.formdata.nama_mahasiswa} name="nama_mahasiswa" onChange={this.changeHandler}
                   type="text" id="defaultFormRegisterEmailEx2" className="form-control" placeholder="Nama" required />
                  
                  <div className="invalid-feedback">Data harus diisi</div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
              <MDBCol  className="mb-3">
                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Alamat</label>
                  <input value={this.state.formdata.alamat} onChange={this.changeHandler} type="text" id="defaultFormRegisterConfirmEx3"
                  className="form-control" name="alamat" placeholder="Your address" required/>
              
                <div className="invalid-feedback">Data harus diisi</div>
              </MDBCol>
              </MDBRow>
          
             <MDBRow>
                <MDBCol className="mb-3">
                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text"> Agama </label>
                  <input value={this.state.formdata.kode_agama} onChange={this.changeHandler} type="text"
                   id="defaultFormRegisterConfirmEx3" className="form-control" name="kode_agama" placeholder="Agama" required
                  />
                 <div className="invalid-feedback">Data harus diisi</div> 
                </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol  className="mb-4">
                <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text">Jurusan</label>
                  <input value={this.state.formdata.kode_jurusan} onChange={this.changeHandler} type="text" id="defaultFormRegisterConfirmEx3"
                  className="form-control" name="kode_jurusan" placeholder="Jurusan" required/>
                <div className="invalid-feedback">Data harus diisi</div>
              </MDBCol>
            </MDBRow>
          
          <MDBRow>
            <MDBCol>
              <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" id="jk1" name="jk" required
                value="Pria" checked={this.state.formdata.jk === 'Pria'} onChange={this.changeHandler}/>
                <label className="form-check-label" htmlFor="jk1">Pria</label>
              </div>

              <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" id="jk2" name="jk" value="Wanita" 
                checked={this.state.formdata.jk === 'Wanita'} onChange={this.changeHandler} required/>
                <label className="form-check-label" htmlFor="jk2"> Wanita</label>
              </div>
            </MDBCol>
            <div className="invalid-feedback">Pilih salah satu</div>
          </MDBRow>

          <MDBRow>
            <MDBCol>
            <div>
                     <label for="text"> Pilih Provinsi </label>
                        <Select className="form"
                        name="kode_prov"
                        value={this.state.selectedOption.kode_prov}
                        onChange={this.handleChange1}
                        options={options1}
                        required
                        />
                    </div>
               
                     <div > 
                    <label for="text">Kota</label>
                        <Select type="text" className="form" placeholder="Pilih kota" 
                        name="kode_kota" 
                        value={this.state.selectedOption2.kode_kota} 
                        onChange={this.handleChange2}
                        options={filteredOptions}
                        required      
                        />
                   </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
          <MDBCol>
          <div class="form-group">
                            <label for="exampleInputEmail1">Hobi</label>
                            
                            <table>
                                <tbody>
                                    { productsList.map((product, i) =>{
                                        return(
                                          <tr >
                                          
                                                <td>{product.name}</td>
                                                <td>
                                                    <div class="custom-control custom-checkbox pl-3">
                                                        <label class="checkbox-checked" >
                                                            <input 
                                                                type="checkbox" 
                                                                
                                                                value={product.name} 
                                                                checked={product.isChecked} 
                                                                onChange={this.onAddingItem(i)}
                                                                required
                                                                />
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                     </div>
          </MDBCol>
          </MDBRow>

          <ModalFooter>
            <MDBBtn color="primary" type="submit">Save</MDBBtn>
            <Button color="warning" onClick={this.props.modalStatus}>Cancel</Button>
          </ModalFooter>
        </form>
              </ModalBody>
            </Modal>
        )
    }
}
export default CreateMahasiswa
