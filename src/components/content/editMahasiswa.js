import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact"
import apiconfig from '../../configs/api.configs.json'
import Select from "react-select"

class EditMahasiswa extends React.Component{
    constructor (props){
        super(props)
      //  let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA)) // =>bisa baca di LocalStorge (agar tahu siapa yg update)
    
    this.state = {
        formdata: {
            kode_mahasiswa: '',
            nama_mahasiswa: '',
            alamat: '',
            kode_agama: '',
            kode_jurusan:'',
            jk:'',
            nameError: '',
            kode_kota: '',
            kode_prov: '',
            nameError:'',
            hobi: ''
           // update_by: userdata.username
        },
            provinsi: [],
            kota: [],
            listKota: [],
            listProvinsi: [],
            selectedValue:"",
            selectedValue2:"",
            productsListNew : []
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
}

handleChange1 = (selectedOption) => {
  this.setState({
    selectedValue : selectedOption.value
  });
  let tmp = this.state.formdata
  tmp["kode_prov"] = selectedOption.value
}

handleChange2 = (selectedOption) => {
  this.setState({selectedValue2 : selectedOption.value});
  let tmp = this.state.formdata
  tmp["kode_kota"] = selectedOption.value
}

    componentWillReceiveProps(newProps){
        this.setState({
            formdata : newProps.listmahasiswa,
            productsListNew : newProps.productsList,
            selectedValue: this.props.listmahasiswa.kode_prov,
            selectedValue2: this.props.listmahasiswa.kode_kota
        })
    }

    onAddingItem = (i) => (event) => {
      this.setState((state, props) => {
          this.props.productsList[i].isChecked = !this.props.productsList[i].isChecked;
        return {
          productsListNew : this.props.productsList
        }
      })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        this.setState({
            formdata: tmp

        })
    }


    validate() {

        let nameError = ""

        if (!this.state.formdata.kode_mahasiswa || !this.state.formdata.nama_mahasiswa || !this.state.formdata.alamat 
            || !this.state.formdata.kode_agama || !this.state.formdata.kode_jurusan || !this.state.formdata.jk) {
            nameError = "Anda Harus Mengisi Semua Field"
        }

        if (nameError) {
            this.state.formdata.nameError = nameError
            // alert(nameError)
            return false
        }

        return true
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

    submitHandler= event =>{
        event.preventDefault();
        event.target.className += " was-validated";
        const isValid = this.validate()
        if (isValid == true) {
          let selectedProductsArray = this.state.productsListNew.filter((product, i)=>{
            return product.isChecked});
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
        this.setState({
          formdata : tmp
      })
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA,
            method: "put",
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
}
componentDidMount() {
  this.getProvinsi();
  this.getKota();
}

    render(){
     
      const options1 = this.state.listProvinsi;
      const options2 =this.state.listKota;

        const filteredOptions = options2.filter(
        o => o.link === this.state.selectedValue)
        return(
            <Modal isOpen={this.props.edit} className = {this.props.className}>
                <ModalHeader>Edit Mahasiswa</ModalHeader>
                <ModalBody>
                {/* <form role="form">
                    <div class ="form-group">
                        <label for="text"> Kode Mahasiswa </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_mahasiswa" 
                        value={this.props.listmahasiswa.kode_mahasiswa} 
                         />
                        <label for="text"> Nama Mahasiswa  </label>
                        <input type="text" class="form-control" placeholder="Type Unit Name" 
                        name="nama_mahasiswa" 
                        value={this.props.listmahasiswa.nama_mahasiswa} 
                        onChange={this.changeHandler}
                         />
                    </div>
                
                    <div class ="form-group"> 
                    <label for="text"> Alamat </label>
                        <input type="text" class="form-control" placeholder="alamat" 
                        name="alamat" 
                        value={this.props.listmahasiswa.alamat} 
                        onChange={this.changeHandler}
                        />
                    <label for="text"> Agama </label>
                        <input type="text" class="form-control" placeholder="Type religion" 
                        name="kode_agama" 
                        value={this.props.listmahasiswa.kode_agama} 
                        onChange={this.changeHandler}
                        />
                    </div>
                    
                    <div class ="form-group">
                    <label for="text"> Jurusan </label>
                        <input type="text" class="form-control" placeholder="Jurusan" 
                        name="kode_jurusan" 
                        value={this.props.listmahasiswa.kode_jurusan} 
                        onChange={this.changeHandler}
                        />
                   </div>
                   <div class="form-group">
                        <div class="custom-control custom-radio custom-control-inline">
                          <input id="jk1" type="radio" name="jk"
                          value="Pria"
                          checked={this.state.formdata.jk === 'Pria'}
                          onChange={this.changeHandler}
                          class="form-check-input" />
                          <label class="form-check-label" for="jk1">Pria</label>                          
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input id="jk2" type="radio" name="jk"
                          value="Wanita"
                          checked={this.state.formdata.jk === 'Wanita'}
                          onChange={this.changeHandler}
                          class="form-check-input" />
                          <label class="form-check-label" for="jk2">Wanita</label>         
                        </div>
                    </div>
                </form> */}
    <form role="form"
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate>

          <MDBRow >
            <MDBCol  className="mb-4">
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Kode Mahasiswa</label>
              <input
                value={this.props.listmahasiswa.kode_mahasiswa} name="kode_mahasiswa"
                onChange={this.changeHandler} type="text" id="defaultFormRegisterNameEx"
                className="form-control" placeholder="Kode Mahasiswa"
                required readOnly
              />
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol className="mb-4">
              <label htmlFor="defaultFormRegisterEmailEx2" className="grey-text"> Nama Mahasiswa</label>
              <input
                value={this.props.listmahasiswa.nama_mahasiswa} name="nama_mahasiswa" onChange={this.changeHandler}
                type="text" id="defaultFormRegisterEmailEx2" className="form-control" placeholder="Nama" required />

            <div className="invalid-feedback">
                Data harus diisi !
              </div>
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol  className="mb-3">
              <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text" > Alamat</label>
              <input value={this.props.listmahasiswa.alamat} onChange={this.changeHandler} type="text"
                id="defaultFormRegisterConfirmEx3" className="form-control" name="alamat" placeholder="Your address"required />
                
                <div className="invalid-feedback">
                    Data harus diisi !
                </div>
            </MDBCol>
          </MDBRow>

          <MDBRow className="form-group">
          <MDBCol className="mb-4">
              <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text" >Agama</label>
              <input
                value={this.props.listmahasiswa.kode_agama} onChange={this.changeHandler} type="text"
                id="defaultFormRegisterConfirmEx3" className="form-control" name="kode_agama"
                placeholder="Agama" required />

              <div className="invalid-feedback">
                Data harus diisi !
              </div>
            </MDBCol>
            </MDBRow>

            <MDBRow>
            <MDBCol  className="mb-4">
              <label htmlFor="defaultFormRegisterConfirmEx3" className="grey-text" > Jurusan</label>
              <input
                value={this.props.listmahasiswa.kode_jurusan} onChange={this.changeHandler} type="text"
                id="defaultFormRegisterConfirmEx3" className="form-control" name="kode_jurusan"
                placeholder="Jurusan" required />
              </MDBCol>
          </MDBRow>

          <MDBRow>
          <MDBCol  className="form-group">
            <div className="custom-control custom-radio">
                <input type="radio" className="form-check-input" id="jk1" name="jk" required
                value="Pria" checked={this.state.formdata.jk === 'Pria'}
                onChange={this.changeHandler}
                />
            <label
                className="form-check-label" htmlFor="jk1">Pria</label>
            </div>
        <div className="custom-control custom-radio">
          <input type="radio" className="form-check-input" id="jk2" name="jk"
            value="Wanita" checked={this.state.formdata.jk === 'Wanita'}
            onChange={this.changeHandler}
            required />
          <label className="form-check-label" htmlFor="jk2" > Wanita </label>
        </div>
          </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
            <div>
                     <label for="text"> Pilih Provinsi  </label>
                        <Select
                        name="kode_prov"
                        value={options1.filter(({value}) => value === this.props.listmahasiswa.kode_prov)}
                        onChange={this.handleChange1}
                        options={options1}
                        required
                        />
                        </div>
                     <div class ="form-group"> 
                      <label for="text"> Kota  </label>
                        <Select type="text" class="form-control" placeholder="Pilih kota" 
                        name="kode_kota" 
                        value={options2.filter(({value}) => value === this.props.listmahasiswa.kode_kota)} 
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
                            <label for="text"> Hobi : </label>
                            
                            <table>
                                <tbody>
                                    { this.props.productsList.map((product, i) =>{
                                        return(
                                            <tr >
                                                
                                                <td>{product.name}</td>
                                                <td>
                                                    <div class="checkbox checkbox-circle checkbox-color-scheme">
                                                        <label class="checkbox-checked">
                                                            <input type="checkbox" 
                                                                value={product.name}
                                                                checked={product.isChecked}
                                                                onChange={this.onAddingItem(i)}
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
          {/* <MDBBtn color="warning" onClick={this.props.modalStatus} type="cancel"> Cancel</MDBBtn> */}
          <Button color="warning" onClick={this.props.modalStatus}>Cancel</Button>
          </ModalFooter>
        </form>
            </ModalBody>
            </Modal>
        )
    }
}
export default EditMahasiswa