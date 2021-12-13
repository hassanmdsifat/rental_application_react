import React, { Component } from "react";
import ReantalTable from "./RentalTable";
import './../css/Home.css';
import axios from 'axios';
import BookButton from "./BookingButton";
import {Row, Container, Col} from 'react-bootstrap';
import ToastComponent from "./Toaster";


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
            <Container>
                <Row className="mt-2 pt-2 btn-div">
                    <Col lg={6}>
                        <BookButton reloadTable={this.reloadTableData}></BookButton>
                    </Col>
                    <Col lg={6}>
                        <BookButton reloadTable={this.reloadTableData} className="btn-return"></BookButton>
                    </Col>
                </Row>
                <Row className="table">
                    <ReantalTable tableData={this.state.tableData}></ReantalTable>
                </Row>
                <ToastComponent/>
            </Container>
            
        );
    }
}
export default HomePage;