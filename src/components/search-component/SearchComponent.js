import React, {Component} from 'react';

class SearchComponent extends Component {

    constructor(props){
        super(props);
    }

    onChange($event){
        this.props.onChange($event.target.value);
    }

    render() {
        return (
            <div className="form-inline">
                <input type="email" className="form-control" id="startDate" placeholder="Start Date"/>
                <input type="email" className="form-control" id="endDate" placeholder="End Date"/>
                <input type="text"
                       className="form-control"
                       id="name" style={{float: 'right'}}
                       onChange={($event)=>this.onChange($event)}
                       placeholder="Search By Name"/>
            </div>
        );
    }
}

export default SearchComponent;