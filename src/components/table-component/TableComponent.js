import React, {Component} from 'react';

class TableComponent extends Component {

    /**
     * active in-active label showing logic
     * @param startDate
     * @param endDate
     * @returns {boolean}
     */
    checkActiveness(startDate, endDate) {
        let activeStatus = null;
        const compareWithStartDate = (Date.parse(startDate) < Date.parse(this.getCurrentDate()));
        const compareWithEndDate = (Date.parse(this.getCurrentDate()) < Date.parse(endDate));
        (compareWithStartDate && compareWithEndDate) ? (activeStatus = true) : (activeStatus = false)
        return activeStatus;
    }

    /**
     * Budget value processing
     * @param budget
     * @returns {string}
     */
    processBudgetInUSD(budget) {
        let budgetRslt = null;
        if (budget.toString().length <= 3) {
            budgetRslt = `${budget} USD`;
        } else {
            budgetRslt = `${Math.round((budget / 1000))}K USD`;
        }
        return budgetRslt;
    }

    /**
     * Render table data
     * @param list
     * @returns {*}
     */
    processTableData(list) {
        const processedList = list.map((rowData, index) => {
            const activeStatus = this.checkActiveness(rowData.startDate, rowData.endDate);
            return (
                <tr key={index}>
                    <td>{rowData.name}</td>
                    <td>{rowData.startDate}</td>
                    <td>{rowData.endDate}</td>
                    <td className={activeStatus ? 'active' : 'in-active'}>
                        {activeStatus ? "Active" : "In-Active"}</td>
                    <td>{this.processBudgetInUSD(rowData.Budget)}</td>
                </tr>
            );
        });
        return processedList;
    }

    /**
     * Render table structure
     * @returns {*}
     */
    renderTable() {
        return (
            <div className="table-container">
                <table className="table table-striped">
                    <thead className="table-header">
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Active</th>
                        <th>Budget (USD)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.processTableData(this.props.tableData)}
                    </tbody>
                </table>
            </div>
        );
    }
    
    /**
     * Get current date
     * @returns {string}
     */
    getCurrentDate() {
        const date = new Date();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

export default TableComponent;