import React from 'react';
import FutureLecturesSummary from '../../../tables/future-lectures-table'

export default class DashboardGraphs extends React.Component {
    render() {
        const styles = {
            divRight: {
                marginLeft: 10,
                width: "50%",
            },
            divLeft: {
                marginRight: 10,
                width: "50%",
            }
        };

        return (
            <div>
                <div style={{display: "flex"}}>
                    <div style={styles.divRight}>
                        <FutureLecturesSummary
                            hideEdit={true}
                            limit={3}
                        />
                    </div>
                    {/*<div style={styles.divLeft}>*/}
                        {/*<FutureLecturesSummary*/}
                            {/*hideEdit={true}*/}

                        {/*/>*/}
                    {/*</div>*/}
                </div>
            </div>

        );
    }
}
