import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

class PageBase extends React.Component {

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
                initiallyExpanded ={isOpen}
            >
                <CardHeader
                    title={title}
                    actAsExpander={true}
                    showExpandableButton={true}
                    titleStyle={style.title}
                />
                <CardMedia expandable={true}>
                    {this.props.children}
                </CardMedia>
            </Card>


        );
    }
}

export default PageBase;
