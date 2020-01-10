import React from 'react'
import ListMahasiswa from "../components/content/listModal";

class Sidebar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      listMahasiswa: false
    };

    this.listModalHandler = this.listModalHandler.bind(this);
    this.mStatus = this.mStatus.bind(this);
  }

  listModalHandler() {
    this.setState({
      listMahasiswa: true
    });
  }

  mStatus() {
    this.setState({
      listMahasiswa: false
    });
    console.log(this.state.listMahasiswa);
  }

  componentDidMount() {
    this.mStatus();
  }

    render (){
    return (
        <aside className="main-sidebar elevation-4 sidebar-dark-primary">
        <a href="#" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">220 JS</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="./dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              ></img>
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Mardatilla Annisa
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column nav-flat" data-widget="treeview"
              role="menu" data-accordion="false">
    
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-copy"></i>
                  <p>
                    Master
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/user" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>User</p>
                </a>
              </li>
              <li className="nav-item">
                    <a
                      // href="/mahasiswa"
                      className="nav-link"
                      onClick={this.listModalHandler}
                    >
                      <i className="fas fa-user-graduate nav-icon"></i>
                      <p>Pop Up</p>
                    </a>
              </li>
              <li class="nav-item">
                <a href="/contoh" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Halaman Contoh</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/mahasiswa" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p> Mahasiswa</p>
                </a>
              </li>
            </ul>
              </li>
            </ul>
          </nav>
        </div>
        <ListMahasiswa list={this.state.listMahasiswa} mStatus={this.mStatus} />
      </aside>
        )
    }

}

export default Sidebar