import React, { Component } from "react";
import ReantalTable from "./RentalTable";
import './../css/Home.css';
import axios from 'axios';
import BookButton from "./BookingButton";


const API = 'http://0.0.0.0:8060/api/';

class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {tableData: []};
      }
    componentDidMount() {
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
                <div className="Booking Button">
                    <BookButton></BookButton>
                </div>
            </div>
        );
    }
}
export default HomePage;