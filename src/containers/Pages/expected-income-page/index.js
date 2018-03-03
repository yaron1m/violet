import React from 'react';
import ExpectedIncomePageTitle from './expected-income-page-title';
import ExpectedIncomeTable from '../../tables/expected-income-table';

export default class ExpectedIncomePage extends React.Component {
    render() {
        return (
            <div>
                <ExpectedIncomePageTitle/>

                <ExpectedIncomeTable/>
            </div>
        );
    }
}
