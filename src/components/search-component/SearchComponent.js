import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            endDate: moment()
        };
        //this.handleStartDate = this.handleStartDate.bind(this);
    }

    handleStartDate(startDate) {
        if (startDate) {
            this.setState({
                startDate
            });
            this.props.onStartDateChange(startDate.format('l'));
        }
    }

    handleEndDate(endDate) {
        if (endDate) {
            this.setState({
                endDate
            });
            this.props.onEndDateChange(endDate.format('l'));
        }
    }


    onChange($event) {
        this.props.onChange($event.target.value);
    }

    render() {
        return (
            <div className="form-inline">
                <DatePicker
                    selected={this.state.startDate || "ddd"}
                    onSelect={(startDate) => this.handleStartDate(startDate)}

                />
                <input type="text"
                       className="form-control"
                       id="name" style={{float: 'right'}}
                       onChange={($event) => this.onChange($event)}
                       placeholder="Search By Name"/>

                <DatePicker
                    selected={this.state.endDate}
                    onSelect={(endDate) => this.handleEndDate(endDate)}
                />
            </div>
        );
    }
}

export default SearchComponent;