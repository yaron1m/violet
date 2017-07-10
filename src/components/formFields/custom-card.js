import React from 'react';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

class CustomCard extends React.Component {

    render() {
        const {title, isOpen} = this.props;

        const style = {
            card: {
                padding: 10,
                marginTop: 20,
            },
            title: {
                fontSize: 24,
            }
        };

        return (

            <Card
                style={style.card}
                initiallyExpanded={isOpen}
            >
                <CardHeader
                    title={title}
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

export default CustomCard;
