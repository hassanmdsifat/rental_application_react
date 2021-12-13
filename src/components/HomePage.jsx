import React, { Component } from "react";
import ReantalTable from "./RentalTable";
import './../css/Home.css';
import axios from 'axios';
import BookButton from "./BookingButton";
import {Row} from 'react-bootstrap';


const API = 'http://0.0.0.0:8060/api/';

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.reloadTableData = this.reloadTableData.bind(this);
        this.state = {tableData: []};
      }
    componentDidMount() {
        this.reloadTableData();
    }
    reloadTableData(){
        console.log("Reloding Table");
        axios.get(API + 'product/')
        .then(result => {
            this.setState({
            tableData: result.data
        })}
        )
        .catch(error => console.log(error));
    }
    render(){
        return (
            <div className="home-main">
                <div className="table">
                    <ReantalTable tableData={this.state.tableData}></ReantalTable>
                </div>
                <Row className="mx-0">
                    <BookButton reloadTable={this.reloadTableData}></BookButton>
                </Row>
            </div>
        );
    }
}
export default HomePage;