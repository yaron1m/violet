import React from 'react';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import PropTypes from 'prop-types';

class CustomCard extends React.Component {

    render() {
        const style = {
            card: {
                padding: 10,
                marginTop: 20, //Space between two cards
            },
            title: {
                fontSize: 24,
            }
        };

        return (

            <Card
                style={style.card}
                initiallyExpanded={this.props.isOpen}
            >
                <CardHeader
                    title={this.props.title}
                    actAsExpander={true}
                    showExpandableButton={true}
                    titleStyle={style.title}
                />
                <CardMedia expandable={true}>
                    <div>
                        {this.props.children}
                    </div>
                </CardMedia>

            </Card>


        );
    }
}

CustomCard.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
};

CustomCard.defaultProps = {
    isOpen: false,
};

export default CustomCard;
