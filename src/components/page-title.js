import React from 'react';

export default class PageTitle extends React.Component {

    render() {
        const style = {
            pageTitle: {
                fontSize: 24,
                maxWidth: this.props.maxWidth,
                marginBottom: 10,
            },
        };

        return (
            <div style={style.pageTitle}>
                {this.props.title}
            </div>
        )
    }

}