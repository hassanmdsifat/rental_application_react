import React, { Component } from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';

const API = 'http://0.0.0.0:8060/api/';

class ReturnModal extends Component{
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleGetPrice = this.handleGetPrice.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleRentalDate = this.handleRentalDate.bind(this);
        this.handleReturnDate = this.handleReturnDate.bind(this);
        this.validatePriceForm = this.validatePriceForm.bind(this);
        this.getEstimatedPrice = this.getEstimatedPrice.bind(this);
        this.handleMileage = this.handleMileage.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
        this.handleRepair = this.handleRepair.bind(this);

        this.state = {
            rentalDate: null,
            returenDate: null,
            mileage: null,
            selectedProduct: 0,
            RentalDateError: false,
            ReturnDateError: false,
            showProductError: false,
            showRentButton: false,
            showRentError: false,
            errors: '',
            mileageError: false,
            needRepair: false,
        }
    }
    handleClose(){
        this.setState({
            rentalDate: null,
            returenDate: null,
            mileage: null,
            selectedProduct: 0,
            RentalDateError: false,
            ReturnDateError: false,
            showProductError: false,
            showRentButton: false,
            showRentError: false,
            errors: '',
            productType: '',
            mileageError: false,
            needRepair: false,
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
        let selectedProductType = event.target[event.target.selectedIndex].getAttribute('data-product_type');
        if(event.target.value === 0){
            this.setState({
                showProductError: true,
                selectedProduct: 0,
                productType: ''
            })
        }else{
            this.setState({
                selectedProduct: event.target.value,
                showProductError: false,
                productType: selectedProductType
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
    handleMileage(event){
        if(event.target.value){
            this.setState({
                mileage: event.target.value,
                mileageError: false,
            })
        }else{
            this.setState({
                mileage: null,
                mileageError: true,
            })
        }
    }
    handleRepair(event){
        this.setState({
            needRepair: !this.state.needRepair
        })
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
        if(this.state.mileage == null && this.state.productType === 'meter'){
            has_error = true;
            this.setState({
                mileageError: true
            })
        }
        return has_error
    }
    handleReturn(){
     let hasError = this.validatePriceForm();
     if(!hasError){
        var url = API + 'product/' + this.state.selectedProduct + '/return/';
        var postData = {
            'actual_rental_date': this.state.rentalDate,
            'actual_return_date': this.state.returenDate,
            'needing_repair': this.state.needRepair,
        }
        console.log(this.state.productType);
        if(this.state.productType === 'meter'){
            postData['mileage'] = this.state.mileage;
        }
        axios.put(url, postData)
        .then(result => {
            console.log(result);
            if(result.status == 200){
                toast.success("Returned Successfully");
                this.handleClose();
                this.props.reloadTable();
            }
        })
        .catch(error => {
            console.log(error.response);
            toast.error("Something Went Wrong");
        });
     }   
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
    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Book Now</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleGetPrice}>
            <Modal.Body>
                <Form.Select size="lg" onChange={this.handleProductChange}>
                <option key={0} value={0} data-product_type={''}>Select Product</option>
                    {
                        this.props.returnData.map((e) => {
                            return <option key={e.id} value={e.id} data-product_type={e.product_type}>{e.code} {e.name} [Price: {e.price}] [Min Day: {e.minimum_rent_period}]</option>;
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
                <Row>
                    <Col lg={12}>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Repair Required?" onClick={this.handleRepair}/>
                        </Form.Group>
                    </Col>
                </Row>
                {
                    this.state.productType == 'meter' &&
                    <Row>
                        <Col lg={12}>
                            <Form.Label>Mileage Used</Form.Label>
                            <Form.Control type="number" isInvalid={this.state.mileageError} onChange={this.handleMileage}/>
                            <Form.Control.Feedback type="invalid">
                                Mileage is required.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                }
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
                  <Button variant="success" onClick={this.handleReturn}>
                        Return!!
                </Button>
              }

            </Modal.Footer>
            </Form>
          </Modal>
        )
    }
}

export default ReturnModal;