// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { shallow } from 'enzyme';

export function shallowWithStore(component, store){
    const context = {
        store,
    };
    return shallow(component, { context });
}
