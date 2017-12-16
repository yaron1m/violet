import React from 'react';
import AllOrdersTable from '../../tables/all-orders-table';
import FilterStatusChoose from './filter-status-choose';

export default class AllOrdersPage extends React.Component {
    constructor(props) {
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
            <div>

                <AllOrdersTable
                    limit={30}
                    filterStatus={this.state.filterStatus}
                    beforeTable={<FilterStatusChoose updateStatus={this.updateStatus.bind(this)}/>}
                />
            </div>
        );
    }
}
