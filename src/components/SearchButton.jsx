import { useState } from 'react';
import {InputGroup, FormControl, ButtonToolbar} from 'react-bootstrap';

export default function SearchButton(props){
    let [searchValue, setSearchValue] = useState('');
    function handleOnClick(){
        props.searchTableData(searchValue);
    }
    function handleOnChange(event){
        setSearchValue(event.target.value);
    }
    return (
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups" style={{
            float: "right"
        }}>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon" onClick={handleOnClick}>Search</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Search"
            aria-label="btnGroupAddon"
            aria-describedby="btnGroupAddon"
            onChange={handleOnChange}
          />
        </InputGroup>
      </ButtonToolbar>
    )
}