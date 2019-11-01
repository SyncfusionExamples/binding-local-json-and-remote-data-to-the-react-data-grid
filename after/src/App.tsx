import React, { useEffect, useState } from 'react';
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
  Page,
  Inject
} from '@syncfusion/ej2-react-grids';
import { Ajax } from '@syncfusion/ej2-base';
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ajax = new Ajax(
      "https://services.odata.org/V4/Northwind/Northwind.svc/Orders",
      "GET"
    );
    ajax.send();
    ajax.onSuccess = (data: any) => {
      setData(JSON.parse(data).value);
    }
  }, []);
  return (
    <div style={{ margin: '10%', marginTop: '5%' }}>
      <h1>Data Manager, Offline Mode, Query Parameter</h1>
      <GridComponent dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 6 }}
      >
        <ColumnsDirective>
          <ColumnDirective field='OrderID' headerText='Invoice ID' textAlign='Right' width='100' />
          <ColumnDirective field='CustomerID' headerText='Customer ID' width='150' />
          <ColumnDirective field='ShipCountry' headerText='Ship Country' />
          <ColumnDirective field='ShipName' headerText='Ship Name' />
          <ColumnDirective field='Freight' textAlign='Right' format='C2' width='100' />
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
    </div>
  );
}

export default App;