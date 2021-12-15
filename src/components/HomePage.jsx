import React, { Component } from "react";
import ReantalTable from "./RentalTable";
import './../css/Home.css';
import axios from 'axios';
import BookButton from "./BookingButton";
import {Row, Container, Col} from 'react-bootstrap';
import ToastComponent from "./Toaster";
import ReturnButton from "./ReturnButton";
import SearchButton from "./SearchButton";
import { API_URL } from "../settings/config";


class HomePage extends Component{
    constructor(props) {
        super(props);
        this.reloadTableData = this.reloadTableData.bind(this);
        this.state = {tableData: []};
      }
    componentDidMount() {
        this.reloadTableData();
    }
    reloadTableData(searchValue=''){
        let url = API_URL + 'product/';
        if(searchValue){
            url += '?search=' + searchValue;
        }
        axios.get(url)
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
                <Row className="mt-2 btn-div">
                    <Col lg={6}>
                        <BookButton reloadTable={this.reloadTableData}></BookButton>
                    </Col>
                    <Col lg={6}>
                        <ReturnButton reloadTable={this.reloadTableData}></ReturnButton>
                    </Col>
                </Row>
                <Row className="table">
                    <Col lg={12}>
                        <SearchButton searchTableData={this.reloadTableData}></SearchButton>
                    </Col>
                    <Col lg={12}>
                        <ReantalTable tableData={this.state.tableData}></ReantalTable>
                    </Col>
                </Row>
                <ToastComponent/>
            </Container>
            
        );
    }
}
export default HomePage;