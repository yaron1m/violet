import React from 'react';
import AllOrdersTable from './AllOrdersTableContainer';
import FilterStatusSelectField from './FilterStatusSelectField';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            filterStatus: null,
        };
    }

    updateStatus(status) {
        this.setState({
            filterStatus: status,
        })
    }

    render() {
        return (
            <AllOrdersTable
                filterStatus={this.state.filterStatus}
                beforeTable={<FilterStatusSelectField
                    updateStatus={this.updateStatus.bind(this)}
                    filterStatus={this.state.filterStatus}
                />}
            />
        );
    }
}
