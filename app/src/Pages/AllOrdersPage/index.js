import React from 'react';
import AllOrdersTableContainer from './AllOrdersTableContainer';
import FilterStatusSelectField from './FilterStatusSelectField';
import CustomToggle from "../../Components/CustomComponents/CustomToggle";
import {updateObject} from "../../Util/ObjectUpdater";
import {flexStyle} from "../../Components/CustomComponents/CustomPaper";

export default class AllOrdersPage extends React.Component {
    state = {
        filterStatus: null,
        showAll: false,
    };

    updateStatus(status) {
        this.setState(updateObject(this.state, {
            filterStatus: status,
        }));
    }

    updateShowAll(key, value) {
        this.setState(updateObject(this.state, {
            showAll: value,
        }))
    }

    render() {
        const filterStatusSelectField =
            <div style={flexStyle}>
                <FilterStatusSelectField
                    updateStatus={this.updateStatus.bind(this)}
                    filterStatus={this.state.filterStatus}
                />
                <CustomToggle
                    name="showAll"
                    titles={{showAll: "הצג הכל"}}
                    updateAction={this.updateShowAll.bind(this)}
                    values={{showAll: this.state.showAll}}
                />
            </div>;

        return (
            <AllOrdersTableContainer
                filterStatus={this.state.filterStatus}
                beforeTable={filterStatusSelectField}
                limit={getLimit(this.state.showAll)}
            />
        );
    }
}

function getLimit(showAll) {
    const limit = 30;
    return showAll ? -1 : limit;
}