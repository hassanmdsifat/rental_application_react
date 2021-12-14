import React, { Component } from "react";
import {toast} from 'react-toastify';
import './../css/Home.css';
import axios from 'axios';
import BookingModal from "./BookingModal";
import {Button} from 'react-bootstrap';
import { API_URL } from '../settings/config';

class BookButton extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            freeProducts: [],
            showModal: false,
        }
      }
    handleClick(){
        axios.get(API_URL + 'product/?availability=true')
        .then(result => {
            if(result.status === 200){
                this.setState({
                    freeProducts: result.data,
                    showModal: true
                });      
            }else{
                toast.error("Something went wrong")
            }
          }
        )
        .catch();
    }
    handleModalClose(){
        this.setState({
            freeProducts: [],
            showModal: false
        })
    }
    render(){
        return (
            <span>
                <Button variant="success" onClick={this.handleClick}>Book Now!</Button>
                <BookingModal show={this.state.showModal} reloadTable={this.props.reloadTable} productDatas={this.state.freeProducts} handleModalClose={this.handleModalClose}></BookingModal>
            </span>
        );
    }
}
export default BookButton;