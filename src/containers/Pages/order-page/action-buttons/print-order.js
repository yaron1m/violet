import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import PrintIcon from 'material-ui/svg-icons/action/print';
import {getLabels} from "../../../../store/labels/reducer";
import {isSelectedOrder} from "../../../../store/selected/reducer";
import {openDialog} from "../../../../store/appearance/actions";

class PrintOrderButton extends React.Component {
    render() {

        const url = "/print";//TODO export dialog content to labels

        return (
            <IconButton
                onClick={() =>{
                    if(!this.props.isSelectedOrder){
                        this.props.dispatch(openDialog("שגיאה","לא נבחרה הזמנה"));
                        return;
                    }
                    if (this.props.history.location.pathname !== url)
                        this.props.history.push(url);
                }}
                tooltip={this.props.labels.print}
            >
                <PrintIcon/>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.actionButtons,
        isSelectedOrder: isSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(PrintOrderButton);
