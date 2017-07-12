import React from 'react';

export default class PageTitle extends React.Component {

    render(){
        const style = {
            pageTitle: {
                fontSize: 24,
                marginBottom: 20
            }
        };

        return(
            <div style={style.pageTitle}>{this.props.children}</div>
        )
    }

}