import React from "react";
import AllOrdersTableContainer from './AllOrdersTableContainer';
import FilterStatusSelectField from './FilterStatusSelectField';
import CustomToggle from "../../Components/CustomComponents/CustomToggle";
import {updateObject} from "../../Util/ObjectUpdater";
import {flexStyle} from "../../Components/CustomComponents/CustomPaper";
import {Status} from '../../Util/Constants/Status';

export default class AllOrdersPage extends React.Component {
    state = {
        filterStatus: undefined,
        showAll: false,
    };

    updateStatus(status: Status) {
        this.setState(updateObject(this.state, {
            filterStatus: status,
        }));
    }

    updateShowAll(key: string, value: boolean) {
        this.setState(updateObject(this.state, {
            showAll: value,
        }));
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

function getLimit(showAll: boolean) {
    const limit = 30;
    return showAll ? -1 : limit;
}