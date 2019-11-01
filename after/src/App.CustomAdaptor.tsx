import React from 'react';
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Page,
    Inject
} from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { setValue } from '@syncfusion/ej2-base';
import './App.css';

// Custom Adaptor
export class SerialNoAdaptor extends ODataV4Adaptor {
    public processResponse() {
        // code to add SNO column
        let i = 0;
        console.log(this);
        const original: any = super.processResponse.apply(this, arguments as any);
        original.result.forEach((item: any) => setValue('Sno', ++i, item));
        // return the result and count as object
        return { result: original.result, count: original.count };
    }
}

const AppCustomAdaptor: React.FC = () => {
    // using DataManager
    const data: DataManager = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
        adaptor: new SerialNoAdaptor()
    });

    return (
        <div style={{ margin: '10%', marginTop: '5%' }}>
            <h1>Custom Adaptor</h1>
            <GridComponent dataSource={data}
                allowPaging={true}
                pageSettings={{ pageSize: 6 }}
            >
                <ColumnsDirective>
                    <ColumnDirective field='Sno' headerText='SNO' width='100' textAlign='Right' />
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

export default AppCustomAdaptor;