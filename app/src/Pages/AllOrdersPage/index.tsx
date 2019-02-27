import React from "react";
import AllOrdersTableContainer from "./AllOrdersTableContainer";
import FilterStatusSelectField from "./FilterStatusSelectField";
import CustomToggle from "../../Components/CustomComponents/CustomToggle";
import {flexStyle} from "../../Components/CustomComponents/CustomPaper";
import {Status} from "../../Util/Constants/Status";

export default class AllOrdersPage extends React.Component {
    state = {
        filterStatus: undefined,
        showAll: false,
    };

    render() {
        const filterStatusSelectField =
            <div style={flexStyle}>
                <FilterStatusSelectField
                    filterStatus={this.state.filterStatus}
                    updateStatus={(filterStatus: Status) => {
                        this.setState({
                            filterStatus,
                        });
                    }}
                />
                <CustomToggle
                    title="הצג הכל"
                    value={this.state.showAll}
                    onChange={(showAll: boolean) => {
                        this.setState({
                            showAll,
                        });
                    }}
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