import React from 'react';
import AllOrdersTable from './all-orders-table'

export default class AllOrdersPage extends React.Component {
    render() {
        return (
            <div>
                <AllOrdersTable limit={30}/>
            </div>
        );
    }
}
