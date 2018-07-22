import React, {Component} from 'react';

class TableComponent extends Component {

    constructor(props){
        super(props);
    }



    render() {
        console.log(this.props.tableData)
        return (
           <div>
               I am a table
           </div>
        );
    }
}

export default TableComponent;