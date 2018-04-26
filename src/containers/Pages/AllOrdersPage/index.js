import React from 'react';
import AllOrdersTableContainer from './AllOrdersTableContainer';
import FilterStatusSelectField from './FilterStatusSelectField';

export default class AllOrdersPage extends React.Component {
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
        const filterStatusSelectField =
            <FilterStatusSelectField
                updateStatus={this.updateStatus.bind(this)}
                filterStatus={this.state.filterStatus}
            />;

        return (
            <AllOrdersTableContainer
                filterStatus={this.state.filterStatus}
                beforeTable={filterStatusSelectField}
            />
        );
    }
}
