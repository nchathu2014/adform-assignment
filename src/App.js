import React, {Component} from 'react';
import SearchComponent from './components/search-component/SearchComponent';
import TableComponent from "./components/table-component/TableComponent";
import data from './data/data-list';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            searchValue: '',
            flagSearchByName: false,
            startDate: null,
            flagSearchByStartDate: false,
            flagSearchByEndDate: false,
            flagInitial: true,
            endDate: null
        };
        this.TIME_OUT = 1000;
        this.initApp();
    }

    /**
     * Bind functions to `this` object
     */
    initApp() {
        this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    /**
     * mimic API call
     */
    fetchDataFromAPI() {
        setTimeout(() => {
            this.setState({
                tableData: data
            })
        }, this.TIME_OUT)
    }

    componentWillMount() {
        this.fetchDataFromAPI();

    }

    /**
     * Callback from SearchComponent with the searched value
     * @param name
     */
    onChange(name = '') {
        this.setState({
            searchValue: name,
            flagInitial: false,
            flagSearchByName: true,
            flagSearchByStartDate: false,
            flagSearchByEndDate: false,
        });
    }

    /**
     * Handle start date callback coming from SearchComponent
     * @param startDate
     */
    handleStartDate(startDate) {
        console.log(startDate)
        this.setState({
            startDate,
            flagInitial: false,
            flagSearchByName: false,
            flagSearchByStartDate: true,
            flagSearchByEndDate: false
        });
    }

    /**
     *  Handle end date callback from SearchComponent
     * @param endDate
     */
    handleEndDate(endDate) {
        console.log(endDate)
        this.setState({
            endDate,
            flagInitial: false,
            flagSearchByName: false,
            flagSearchByStartDate: false,
            flagSearchByEndDate: true
        });
    }

    render() {
        let filteredList = null,
            startDate = this.state.startDate,
            endDate = this.state.endDate,
            returnResult = null;

        if (this.state.tableData && this.state.tableData.length === 0) {
            return (<div>Loading...</div>)
        } else {
            filteredList = this.state.tableData.data.filter((rowData) => {
                if (this.state.flagInitial) {
                    returnResult = this.state.tableData.data //default filter
                }
                else if (this.state.flagSearchByName) {
                    returnResult = rowData.name.indexOf(this.state.searchValue) !== -1; //filter by name
                } else if (this.state.flagSearchByStartDate) {
                    returnResult = Date.parse(rowData.startDate) >= Date.parse(startDate); //filter by start date
                } else if (this.state.flagSearchByEndDate) {
                    returnResult = Date.parse(rowData.endDate) <= Date.parse(endDate); //filter by end date
                }
                return returnResult;
            });

        }
        return <div className="App">
            <SearchComponent onChange={(name) => this.onChange(name)}
                             onStartDateChange={this.handleStartDate}
                             onEndDateChange={this.handleEndDate}
            />
            <TableComponent tableData={filteredList}/>
        </div>;
    }
}

export default App;
