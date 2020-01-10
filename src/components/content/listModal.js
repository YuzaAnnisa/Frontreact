import React from "react";
import apiConfig from '../../configs/api.configs.json';
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import CreateMahasiswa from "./createMahasiswa"
import ViewMahasiswa from "./viewMahasiswa"
import EditMahasiswa from "./editMahasiswa"
import DeleteMahasiswa from "./deleteMahasiswa"
import { Modal, ModalBody } from "reactstrap";


class ListModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //showCreateMahasiswa: false,
      mahasiswa: [],
      listmahasiswa:[],
      currentmahasiswa:{},
      productsListNew : [],
      currentAgama : {},
      currentProvinsi: {},
      currentMahasiswa: {}
    }
    this.viewModalHandler = this.viewModalHandler.bind(this)
    this.editModalHandler = this.editModalHandler.bind(this)
    this.deleteModalHandler = this.deleteModalHandler.bind(this)
    this.createModalHandler=this.createModalHandler.bind(this)
    this.modalStatus = this.modalStatus.bind(this)
    this.getListHobi = this.getListHobi.bind(this)
    
  }

  getListHobi () {
    let productsList  = [
            {name: 'Travelling', isChecked: false},
            {name: 'Main Game', isChecked: false},
            {name: 'Tidur', isChecked: false},
            {name: 'Bernyanyi', isChecked: false},
      ]

      return  productsList
}

  createModalHandler(){
    this.setState({
      createMahasiswa:true
    })
  }

  editModalHandler(kode_mahasiswa){
    let tmp = {}
    let tmpHobi = this.getListHobi()

    this.state.mahasiswa.map((ele) =>{
      if(kode_mahasiswa == ele.kode_mahasiswa){
        tmp = ele
      }
    })
    //checkboxnya
    let array = tmp.hobi.split(',')
         
        tmpHobi.map((rows) => {
            
            array.forEach(ele =>{
                if (ele.trim() == rows.name){
                    rows.isChecked = !rows.isChecked
                    
              }
        })
    })

        this.setState({
          currentmahasiswa : tmp,
          editMahasiswa : true,
          productsListNew : tmpHobi
        })
      
  }

  deleteModalHandler(kode_mahasiswa){
    this.state.mahasiswa.map((ele) =>{
      if(kode_mahasiswa == ele.kode_mahasiswa){
        this.setState({
          currentmahasiswa : ele,
          deleteMahasiswa : true
        })
      }
    })
  }

  getMahasiswa() {
    let token = localStorage.getItem(apiConfig.LS.TOKEN);
    let deskripsi = this.state.currentAgama.value
    let tmp = []
    tmp.kode_agama = deskripsi
    let option = {
      url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.MAHASISWA,
      method: "get",
      headers: {
        authorization: token
      }
    };
    axios(option)
      .then(response => {
        let tmp = []

        response.data.message.map((row, x) => {
          let action = (
            <Link to="#">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default fas fa-bars"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></button>

                <span class="sr-only">Toggle Dropdown</span>
                <div
                  class="dropdown-menu"
                  role="menu"
                  x-placement="bottom-start"
                >
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      this.viewModalHandler(row.kode_mahasiswa);
                    }}
                  >
                    <li className="fas fa-search"></li> View
                  </a>
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      this.editModalHandler(row.kode_mahasiswa);
                    }}
                  >
                    <li
                      className="fas fa-edit"
                      style={{ color: "#3f51b5" }}
                    ></li>{" "}
                    Edit
                  </a>
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => {
                      this.deleteModalHandler(row.kode_mahasiswa);
                    }}
                  >
                    <li
                      className="fas fa-trash"
                      style={{ color: "#f44336" }}
                    ></li>{" "}
                    Delete
                  </a>
                </div>
              </div>
            </Link>
          );

          tmp.push({
            no: x + 1 + ".",
            kode_mahasiswa: row.kode_mahasiswa,
            nama_mahasiswa: row.nama_mahasiswa,
            alamat:row.alamat,
            kode_agama: row.kode_agama,
            kode_jurusan: row.kode_jurusan,
            jk: row.jk,
            kode_kota: row.kode_kota,
            kode_prov: row.kode_prov,
            hobi: row.hobi,
            action: action
          })
        })
        this.setState({
          listmahasiswa: tmp,
          mahasiswa: response.data.message
        })
      })
      .catch(error => {
        alert(error);
      });
  }
  //untuk render data dari db
  componentDidMount() {
    this.getMahasiswa();
    this.getAgama();
  }

  modalStatus(){
    this.setState({
      viewMahasiswa : false,
      editMahasiswa : false,
      createMahasiswa : false,
      deleteMahasiswa : false
    })
    this.getMahasiswa()
  }

  viewModalHandler(kode_mahasiswa){
    let tmp ={}
    let tmpHobi = this.getListHobi()
    this.state.mahasiswa.map((ele)=>{ //ele (elemen) atau row sma 
      if (kode_mahasiswa == ele.kode_mahasiswa){
        tmp = ele
      }
    })

    let array = tmp.hobi.split(',')
         
    tmpHobi.map((rows) => {
        
        array.forEach(ele =>{
            if (ele.trim() == rows.name){
                rows.isChecked = !rows.isChecked
                
            }
        })
    })

    this.setState({
      currentmahasiswa : tmp,
      viewMahasiswa : true,
      productsListNew : tmpHobi
    })
  }

  getAgama() {
    let token = localStorage.getItem(apiConfig.LS.TOKEN);
    let option = {
      url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.AGAMA,
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
            value: row.kode_agama,
            label: row.deskripsi
          });
        });
        this.setState({
          listAgama: tmp,
          agama: response.data.message
        });
       
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    
    const data = {
      columns: [
        {
          label :"No",
          field : "no",
          sort :"asc"
         
        },
        {
          label: "Kode Mahasiswa",
          field: "kode_mahasiswa",
          sort: "asc"
        },
        {
          label: "Nama Mahasiswa",
          field: "nama_mahasiswa",
          sort: "asc"
        },
        {
          label: "Alamat",
          field: "alamat",
          sort: "asc"
        },
        {
          label: "Agama",
          field: "deskripsi",
          sort: "asc"
        },
        {
          label: "Jurusan",
          field: "kode_jurusan",
          sort: "asc"
        },
        {
          label: "Jenis Kelamin",
          field: "jk",
          sort: "asc"
        },
        {
          label: "Kota",
          field: "kode_kota",
          sort: "asc"
        },
        {
          label: "Provinsi",
          field: "kode_prov",
          sort: "asc"
        },
        {
          label: "Hobi",
          field: "hobi",
          sort: "asc",
          width: 150
        },
        {
          label : "Action",
          field : "action"
        }
        
      ],
      rows: this.state.listmahasiswa //DATA
    };
    return (
        <Modal isOpen={this.props.list} className="modal-dialog modal-xl">
        <div class="modal-header">
          <h4 class="modal-title">Data Mahasiswa</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={this.props.mStatus}>
              ×
            </span>
          </button>
        </div>
        <ModalBody>
          <div className="card">
            <div className="card-header">
              <div className="card-title"></div>
              <div className="card-tools">
                <ul className="nav nav-pills ml-auto">
                  <li class="nav-item">
                    <button
                      type="button"
                      class="btn btn-primary float-right"
                      onClick={this.createModalHandler}
                    >
                      <i class="fas fa-plus"></i> Add Data
                    </button>
                  </li>
                </ul>
              </div>
              <div className="table-responsive">
                <MDBDataTable striped bordered hover data={data} />
              </div>
            </div>
        </div> 
     < ViewMahasiswa

      listmahasiswa = {this.state.currentmahasiswa}
      view = {this.state.viewMahasiswa}
      modalStatus = {this.modalStatus}
      productsList = {this.state.productsListNew}
      />
    
    < EditMahasiswa

      listmahasiswa = {this.state.currentmahasiswa}
      edit = {this.state.editMahasiswa}
      modalStatus = {this.modalStatus}
      productsList = {this.state.productsListNew}
      />

      <CreateMahasiswa
      create={this.state.createMahasiswa}
      modalStatus={this.modalStatus}
      productsList = {this.getListHobi()}
      
      /> 
      
      < DeleteMahasiswa
      listmahasiswa = {this.state.currentmahasiswa}
      delete = {this.state.deleteMahasiswa}
      modalStatus = {this.modalStatus}
      />           
    </ModalBody>
    </Modal>
    
    )
  }
}

export default ListModal;