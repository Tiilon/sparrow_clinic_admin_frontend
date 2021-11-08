import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Datatable = ({data}) => {

  return (
    <MDBDataTable
      striped
      // bordered
      hover
      data={data}
      materialSearch
    />
  );
}

export default Datatable;