import React from 'react';
import InfoBoxes from './info-boxes';
import Tables from './tables';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <InfoBoxes/>
                <Tables/>
            </div>
        );
    }
}
