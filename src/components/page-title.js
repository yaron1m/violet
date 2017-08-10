import React from 'react';

export default class PageTitle extends React.Component {

    render() {
        const style = {
            pageTitle: {
                fontSize: 24,
                maxWidth: this.props.maxWidth
            },
        };

        return (
            <span style={style.pageTitle}>{this.props.title}</span>
        )
    }

}