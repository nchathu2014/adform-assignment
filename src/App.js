import React, {Component} from 'react';
import SearchComponent from './components/search-component/SearchComponent';
import TableComponent from "./components/table-component/TableComponent";
import data from './data/data-list';
import logo from './logo.svg';
import _ from 'lodash';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            searchValue: '',
            startDate:null,
            endDate:null
        };
        this.initApp();
    }

    /**
     * Bind functions to `this` object
     */
    initApp() {
        // this.renderTable = this.renderTable.bind(this);
        this.fetchDataFromAPI = this.fetchDataFromAPI.bind(this);
        //this.processTableData = this.processTableData.bind(this);
        //this.checkActiveness = this.checkActiveness.bind(this);
        // this.getCurrentDate = this.getCurrentDate.bind(this);
        // this.processBudgetInUSD = this.processBudgetInUSD.bind(this);
    }

    /**
     * mimic API call
     */
    fetchDataFromAPI() {
        setTimeout(() => {
            this.setState({
                tableData:  data
            })
        }, 1000)
    }

    componentWillMount() {
        this.fetchDataFromAPI();

    }


    /**
     * Callback from SearchComponent with the searched value
     * @param name
     */
    onChange(name) {
        this.setState({
            searchValue : name
        });
    }

    render() {
        let filteredList;
        if (this.state.tableData && this.state.tableData.length === 0) {
            return (<div>Loading...</div>)
        } else {
             filteredList = this.state.tableData.data.filter((rowData)=>{
                return rowData.name.indexOf(this.state.searchValue) !== -1
            });
        }



        return <div className="App">

            <SearchComponent onChange={(name) => this.onChange(name)}/>
            <TableComponent tableData = {filteredList} />

        </div>;
    }
}

export default App;
