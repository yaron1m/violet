import {connect} from 'react-redux';
import {getLabels} from '../../../Store/Labels/Selectors';
import {redirect} from '../../../Util/HistoryUtil';
import NavigationButton from './NavigationButton';
import {Path} from '../../Path';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.allPublicCourses,
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.allPublicCourses),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);