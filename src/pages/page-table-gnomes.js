import React, { Component } from 'react';
import MaterialTable from 'material-table';
import SEO from "../components/seo";
import { Link } from "gatsby"
import './table.css';
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import LayoutTable from '../components/layoutTable';



export default class TableGnomes extends Component {
  
  state = {
    selectedRow: null,
    users: [],
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(results => results.json())
      .then(data => {
        this.setState({
          users: data.Brastlewark,
        })
      })
    .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.users)
    return (
      <LayoutTable location={this.props.location}>
        <Link to="/" style={{ top:'10px', right: '10px', position: 'absolute'}}>Go back to the homepage</Link>
        <div style={{
          maxWidth: "100%",
          margin: "20px",
          }}>
          <SEO title="Page tables Gnomes" />
          <MaterialTable
            title="All Gnomes Census"
            tableRef={this.tableRef}
            style={{padding: '20px'}}
            columns={[
              {
                title: 'Avatar',
                field: 'thumbnail',
                render: rowData => (
                  <img
                    style={{ width: 80, height: 80, borderRadius: '100%' }}
                    src={rowData.thumbnail}
                    alt='Gnomes img'
                  />
                ),
              },
              // { title: 'Id', field: 'id' },
              { title: 'Name', field: 'name' },
              { title: 'Age', field: 'age' },
              { title: 'Weight', field: 'weight' },
              { title: 'Height', field: 'height' },
              { title: 'Hair Color', field: 'hair_color' },
              { 
                title: 'Professions',
                field: 'professions',
                render: rowData => (
                  rowData.professions.map((professions, i) =>
                    <li key={i}>{professions}</li>
                  )
                )
              },
              { 
                title: 'Friends',
                field: 'friends',
                render: rowData => (
                  rowData.friends.map((friends, i) =>
                    <li key={i}>{friends}</li>
                  )
                )
              },
            ]}
            data={this.state.users}
            options={{
              search: true,
              pageSizeOptions: [20, 50, 100, 500, 1000],
              pageSize: 20,
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF',
              }),
            }}
            onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
          />
      </div>
    </LayoutTable>
    )
  }
}
