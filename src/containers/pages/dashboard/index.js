import React from 'react';
import InfoBoxes from './info-boxes';
import NavigationButtons from "./navigation-buttons";
import Tables from './tables'

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <NavigationButtons/>

                <InfoBoxes/>

                <Tables/>
            </div>
        );
    }
}
