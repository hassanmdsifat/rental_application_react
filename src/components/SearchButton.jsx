import {React, Component} from 'react';
import {InputGroup, FormControl, ButtonToolbar} from 'react-bootstrap';

class SearchButton extends Component{
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = { 
            searchValue: ''
        }
    }
    handleOnClick(event){
        console.log(this.state.searchValue);
        this.props.searchTableData(this.state.searchValue);
    }
    handleOnChange(event){
        this.setState({
            searchValue: event.target.value
        })
    }
    render(){
        return(
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups" style={{
                float: "right"
            }}>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon" onClick={this.handleOnClick}>Search</InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search"
                aria-label="btnGroupAddon"
                aria-describedby="btnGroupAddon"
                onChange={this.handleOnChange}
              />
            </InputGroup>
          </ButtonToolbar>
        )
    }
}

export default SearchButton;