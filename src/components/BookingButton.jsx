import React, { Component } from "react";
import {toast} from 'react-toastify';
import './../css/Home.css';
import axios from 'axios';
import ToastComponent from "./Toaster";


const API = 'http://0.0.0.0:8060/api/';

class BookButton extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            freeProducts: []
        }
      }
    handleClick(){
        axios.get(API + 'product/?availability=true')
        .then(result => {
            if(result.status === 200){
                this.setState({
                    freeProducts: result.data
                })      
            }else{
                toast.error("Something went wrong")
            }
          }
        )
        .catch(error => console.log(error));
    }
    render(){
        return (
            <div>
            <button onClick={this.handleClick} className="book-btn">Book Now!</button>
            <ToastComponent/>
            </div>
        );
    }
}
export default BookButton;