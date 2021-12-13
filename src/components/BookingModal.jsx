import React, { Component } from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

const API = 'http://0.0.0.0:8060/api/';

class BookingModal extends Component{
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleGetPrice = this.handleGetPrice.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleRentalDate = this.handleRentalDate.bind(this);
        this.handleReturnDate = this.handleReturnDate.bind(this);
        this.validatePriceForm = this.validatePriceForm.bind(this);
        this.getEstimatedPrice = this.getEstimatedPrice.bind(this);
        this.handleRent = this.handleRent.bind(this);

        this.state = {
            rentalDate: null,
            returenDate: null,
            selectedProduct: 0,
            RentalDateError: false,
            ReturnDateError: false,
            showProductError: false,
            showRentButton: false,
            showRentError: false,
            errors: ''
        }
    }
    handleClose(){
        this.setState({
            rentalDate: null,
            returenDate: null,
            selectedProduct: 0,
            RentalDateError: false,
            ReturnDateError: false,
            showProductError: false,
            showRentButton: false,
            showRentError: false,
            errors: ''
        })
        this.props.handleModalClose();
    }
    handleGetPrice(event){
        event.preventDefault();
        let has_error = this.validatePriceForm();
        if (has_error != true){
            console.log(this.state.selectedProduct);
            this.getEstimatedPrice();
        }
    }
    handleProductChange(event){
        if(event.target.value === 0){
            this.setState({
                showProductError: true,
                selectedProduct: 0
            })
        }else{
            this.setState({
                selectedProduct: event.target.value,
                showProductError: false
            })
        }
    }
    handleRentalDate(event){
        if(event.target.value){
            this.setState({
                rentalDate: event.target.value,
                RentalDateError: false
            })
        }else{
            this.setState({
                RentalDateError: true,
            })
        }
    }
    handleReturnDate(event){
        if(event.target.value){
            this.setState({
                returenDate: event.target.value,
                ReturnDateError: false
            })
        }else{
            this.setState({
                ReturnDateError: true
            })
        }
    }
    validatePriceForm(){
        let has_error = false;
        if(this.state.selectedProduct === 0){
            has_error = true;
            this.setState({
                showProductError: true
            })
        }
        if(this.state.rentalDate == null){
            has_error = true;
            this.setState({
                RentalDateError: true
            })
        }
        if(this.state.returenDate == null){
            has_error = true;
            this.setState({
                ReturnDateError: true
            })
        }
        return has_error
    }
    getEstimatedPrice(){
        let url = API + 'product/' + this.state.selectedProduct + '/price/?from_date='+ this.state.rentalDate + '&to_date='+this.state.returenDate;
        axios.get(url)
        .then(result => {
            if(result.status == 200){
                this.setState({
                    estimatedPrice: result.data.price,
                    showRentButton: true,
                    errors: '',
                    showRentError: false
                })
            }
        })
        .catch(error => {
            this.setState({
            showRentError: true,
            errors: error.response.data.error,
            showRentButton: false,
            estimatedPrice: 0
        })});
    }
    handleRent(){
        var url = API + 'product/' + this.state.selectedProduct + '/book/';
        var postData = {
            'rental_date': this.state.rentalDate,
            'return_date': this.state.returenDate
        }
        axios.post(url, postData)
        .then(result => {
            if(result.status == 201){
                toast.success("Rented Successfully");
                this.handleClose();
                this.props.reloadTable();
            }
        })
        .catch(error => {
            console.log(error.response.data.error);
            toast.error("Something Went Wrong");
        });
    }
    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Book Now</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleGetPrice}>
            <Modal.Body>
                <Form.Select size="lg" onChange={this.handleProductChange}>
                <option key={0} value={0}>Select Product</option>
                    {
                        this.props.productDatas.map((e) => {
                            return <option key={e.id} value={e.id}>{e.code} {e.name} [Price: {e.price}] [Min Day: {e.minimum_rent_period}]</option>;
                        })
                    }
                </Form.Select>
                <Row>
                    <Col lg={6}>
                        <Form.Label>Rental Date</Form.Label>
                        <Form.Control type="date" name="rental_date" placeholder="2021-10-15" isInvalid={this.state.RentalDateError} onChange={this.handleRentalDate}/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a date.
                        </Form.Control.Feedback>
                    </Col>
                    <Col lg={6}>
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control type="date" name="return_date" placeholder="2021-10-15" isInvalid={this.state.ReturnDateError} onChange={this.handleReturnDate}/>
                        <Form.Control.Feedback type="invalid">
                            Please choose a date.
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                {
                    this.state.showRentButton && 
                    <Row>
                        <Col lg={12}>
                            Your Estimated Price is {this.state.estimatedPrice}
                        </Col>
                    </Row>
                }
                {
                    this.state.showRentError && 
                    <Row>
                        <Col lg={12}>
                            Error Occured: {this.state.errors}
                        </Col>
                    </Row>
                }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button type="submit"variant="primary">
                Get Price
              </Button>
              {
                  this.state.showRentButton && 
                  <Button variant="success" onClick={this.handleRent}>
                        Rent!!
                </Button>
              }

            </Modal.Footer>
            </Form>
          </Modal>
        )
    }
}

export default BookingModal;