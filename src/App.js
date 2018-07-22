import React, {Component} from 'react';
import SearchComponent from './components/search-component/SearchComponent';
import TableComponent from "./components/table-component/TableComponent";
import data from './data/data-list';
import './App.css';
import moment from 'moment';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            searchValue: '',
            flagSearchByName:false,
            startDate: null,
            flagSearchByStartDate:false,
            flagSearchByEndDate:false,
            flagInitial:true,
            endDate: null
        };
        this.TIME_OUT=1000;
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
            flagInitial:false,
            flagSearchByName:true,
            flagSearchByStartDate:false,
            flagSearchByEndDate:false,
        });
    }

    handleStartDate(startDate) {
        console.log(startDate)
        this.setState({
            startDate,
            flagInitial:false,
            flagSearchByName:false,
            flagSearchByStartDate:true,
            flagSearchByEndDate:false
        });
    }

    handleEndDate(endDate) {
        console.log(endDate)
        this.setState({
            endDate,
            flagInitial:false,
            flagSearchByName:false,
            flagSearchByStartDate:false,
            flagSearchByEndDate:true
        });
    }

    filterByName(dataList){

    }


    render() {
        let filteredList;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;

        if (this.state.tableData && this.state.tableData.length === 0) {
            return (<div>Loading...</div>)
        } else {

                let _this = this;
                filteredList = this.state.tableData.data.filter((rowData) => {

                    if(this.state.flagInitial){
                        return this.state.tableData.data
                    }

                    else if(this.state.flagSearchByName){
                        console.log("By NAME")
                        return rowData.name.indexOf(this.state.searchValue) !== -1;
                    }else if(this.state.flagSearchByStartDate){
                        return Date.parse(rowData.startDate) >= Date.parse(startDate);
                    }else if(this.state.flagSearchByEndDate){
                        return Date.parse(rowData.endDate) <= Date.parse(endDate);
                    }

                });

        }

        return <div className="App">

            <SearchComponent onChange={(name) => this.onChange(name)}
                             onStartDateChange={this.handleStartDate}
                             onEndDateChange={this.handleEndDate}/>
            <TableComponent tableData={filteredList}/>

        </div>;
    }
}

export default App;
