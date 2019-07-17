import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './table.css';

export default class TableGnomes extends Component {
  
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Remote Data Preview"
          tableRef={this.tableRef}
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
                    page: 1,
                    totalCount: result.total,
                  })
                })
            })
          }
          options={{
            search: true,
          }}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
            }
          ]}
        />
    </div>
    )
  }
}
