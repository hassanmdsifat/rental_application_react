import {React, Component} from 'react';
import {Button} from 'react-bootstrap';
import ReturnModal from './ReturnModal';
import axios from 'axios';
import {toast} from 'react-toastify';
import { API_URL } from '../settings/config';


class ReturnButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            returnData: []
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOnClick(){
        axios.get(API_URL + 'product/?availability=false')
        .then(result => {
            if(result.status === 200){
                console.log(result.data);
                this.setState({
                    returnData: result.data,
                    showModal: true
                });      
            }
          }
        )
        .catch(error=>{
            toast.error("Something went wrong");
        });
    }
    handleClose(){
        this.setState({
            showModal: false,
            returnData: []
        })
    }
    render(){
        return (
            <span>
                <Button variant="primary" style={{
                    float: 'right'
                }} onClick={this.handleOnClick}>Return Product!
                </Button>
                <ReturnModal show={this.state.showModal} returnData={this.state.returnData} handleModalClose={this.handleClose} reloadTable={this.props.reloadTable}></ReturnModal>
            </span>
        )
    }
}

export default ReturnButton;