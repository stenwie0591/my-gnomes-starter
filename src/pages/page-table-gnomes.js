import React, { Component } from 'react';
import MaterialTable from 'material-table';
import SEO from "../components/seo";
import { Link } from "gatsby"
import './table.css';
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import LayoutTable from '../components/layoutTable';



export default class TableGnomes extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: null
    }

    this.tableRef = React.createRef();
  }

  render() {
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
                    style={{ width: 110, height: 110, borderRadius: '100%' }}
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
            data={query =>
              new Promise((resolve) => {
                let url = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json'
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.Brastlewark,
                      page: query.page,
                      totalCount:  result.Brastlewark.length,
                    })
                  })
              })
            }
            options={{
              search: true,
              pageSizeOptions: [20, 50, 100, 500, 1000],
              pageSize: 20,
              rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF',
              }),
            }}
            actions={[
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
              }
            ]}
            onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
          />
      </div>
    </LayoutTable>
    )
  }
}
