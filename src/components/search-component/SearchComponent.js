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
    }

    /**
     * Passing selected start date to the parent AppComponent
     * @param startDate
     */
    handleStartDate(startDate) {
        if (startDate) {
            this.setState({
                startDate
            }, () => {
                this.props.onStartDateChange(startDate.format('l'));
            });

        }
    }

    /**
     * Passing selected end date to the parent AppComponent
     * @param endDate
     */
    handleEndDate(endDate) {
        if (endDate) {
            this.setState({
                endDate
            }, () => {
                this.props.onEndDateChange(endDate.format('l'));
            });

        }
    }

    /**
     * Passing search name to the parent AppComponent
     * @param $event
     */
    onChange($event) {
        this.props.onChange($event.target.value);
    }

    render() {
        return (
            <div className="form-inline search-header">
                <div className="row">
                    <div className="col-xs-8">
                        <div className="row">
                            <div className="col-xs-4">
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.startDate}
                                    onSelect={(startDate) => this.handleStartDate(startDate)}
                                />
                            </div>
                            <div className="col-xs-4">
                                <DatePicker
                                    className="form-control date-picker"
                                    selected={this.state.endDate}
                                    onSelect={(endDate) => this.handleEndDate(endDate)}
                                />
                            </div>
                            <div className="col-xs-4">
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-4 margin-bottom">
                        <div className="input-group pull-right">
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   onChange={($event) => this.onChange($event)}
                                   placeholder="Search By Name"/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary" type="submit" disabled>
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;