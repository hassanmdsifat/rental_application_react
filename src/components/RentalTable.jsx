import React, {Component} from 'react';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Price',
        selector: row => parseFloat(row.price),
        sortable: true,
    },
    {
        name: 'Available',
        selector: row => {
            if(row.availability){
                return "Yes"
            }else{
                return "No"
            }
        },
        sortable: true,
    },
    {
        name: 'Repair Status',
        selector: row => {
            if(row.needing_repair){
                return "Not Okay"
            }else{
                return "Okay"
            }
        },
        sortable: true,
    },
    {
        name: 'Durability',
        selector: row => row.durability,
        sortable: true,
    },
];

class ReantalTable extends Component{
    render(){
        return (
            <DataTable
                columns={columns}
                data={this.props.tableData}
                pagination
            />
        );
    }
}
export default ReantalTable;