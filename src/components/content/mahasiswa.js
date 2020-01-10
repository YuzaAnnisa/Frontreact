import React from "react";
import apiConfig from '../../configs/api.configs.json';
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import CreateMahasiswa from "./createMahasiswa"
import ViewMahasiswa from "./viewMahasiswa"
import EditMahasiswa from "./editMahasiswa"
import DeleteMahasiswa from "./deleteMahasiswa"


class Mahasiswa extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //showCreateMahasiswa: false,
      mahasiswa: [],
      listmahasiswa:[],
      currentmahasiswa:{},
      productsListNew : []
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
    let option = {
      url: apiConfig.BASE_URL + apiConfig.ENDPOINTS.MAHASISWA,
      method: "get",
      headers: {
        "authorization": token
      }
    };
    axios(option)
      .then(response => {
        let tmp=[]

        response.data.message.map((row, x) =>{
          let kolom = <div class="dropdown">
          <span class="btn btn-secondary dropdown-toggle" className="fas fa-th-large" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <Link to='#'>
          <button class="dropdown-item" type="button"><span onClick={() => {this.viewModalHandler(row.kode_mahasiswa)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}}/></button>
          <button class="dropdown-item" type="button"><span onClick={() => {this.editModalHandler(row.kode_mahasiswa)}} className="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} /></button>
          <button class="dropdown-item" type="button"><span onClick={() => {this.deleteModalHandler(row.kode_mahasiswa)}} className="fa fa-trash" style={{fontSize : '18px'}} /></button>
        </Link>
        </div>
        </div>
        tmp.push({"no": x+1, "kode_mahasiswa": row.kode_mahasiswa, "nama_mahasiswa": row.nama_mahasiswa, "alamat": row.alamat, "kode_agama":row.kode_agama, 
        "kode_jurusan": row.kode_jurusan, "jk": row.jk, "kode_kota": row.kode_kota, "kode_prov": row.kode_prov, "hobi": row.hobi, action:kolom})
        })
        
        this.setState({
          listmahasiswa: tmp,
          mahasiswa: response.data.message
        });
      })
      .catch(error => {
        alert(error);
      });
  }
  componentDidMount() {
    this.getMahasiswa();
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

  render() {
    
    const data = {
      columns: [
        {
          label :"No",
          field : "no",
          sort :"asc",
          width: 150
        },
        {
          label: "Kode Mahasiswa",
          field: "kode_mahasiswa",
          sort: "asc",
          width: 150
        },
        {
          label: "Nama Mahasiswa",
          field: "nama_mahasiswa",
          sort: "asc",
          width: 270
        },
        {
          label: "Alamat",
          field: "alamat",
          sort: "asc",
          width: 200
        },
        {
          label: "Agama",
          field: "kode_agama",
          sort: "asc",
          width: 100
        },
        {
          label: "Jurusan",
          field: "kode_jurusan",
          sort: "asc",
          width: 150
        },
        {
          label: "Jenis Kelamin",
          field: "jk",
          sort: "asc",
          width: 150
        },
        {
          label: "Kota",
          field: "kode_kota",
          sort: "asc",
          width: 150
        },
        {
          label: "Provinsi",
          field: "kode_prov",
          sort: "asc",
          width: 150
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
    <div> 
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
            <div className="container">
                <h4> Mahasiswa</h4>
                <button type="button" className="btn-primary float-right"
                onClick={this.createModalHandler}>Add</button>
                </div>
                
    < MDBDataTable striped
    bordered
    hover 
    data={data} />
    </div>
    )
  }
}

export default Mahasiswa;