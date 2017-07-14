import React from 'react';

export default class PageTitle extends React.Component {

    render() {
        const style = {
            pageTitle: {
                fontSize: 24,
            },
            buttons: {
                float: "left",
            }
        };

        return (
            <div >
                <span style={style.pageTitle}>{this.props.title}</span>

                <span style={style.buttons}>{this.props.buttons}</span>

            </div>

        )
    }

}