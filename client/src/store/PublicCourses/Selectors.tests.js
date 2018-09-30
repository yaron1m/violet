import Immutable from 'seamless-immutable';

const sampleState = Immutable({
    publicCourses: {
        1000: {
            courseName: "my course name",
            courseLocation: "My house",
            courseCity: "Ramat-Gan",
            distanceCost: "80",
            id: 1000,
            lectures:[
                {
                active: true,
                    date: "2018-12-31",
                    startTime: "9:00",
                    endTime: "16:00",


                }

            ]
        },
        1: {
            "address": "נתניה",
            "companyId": "0520520352",
            "id": 1,
            "name": "סלקום"
        },
        2: {
            "id": 2,
            "name": "תעשיה צבאית"
        }
    }
});

const emptyState = {
    publicCourses: {}
};
//
// describe('Organizations selectors', () => {
//
//     it('getOrganizations - valid', () => {
//         expect(getOrganizations(sampleState))
//             .toEqual(sampleState.organizations);
//     });
//
//     it('getOrganizations - empty state', () => {
//         expect(getOrganizations(emptyState))
//             .toEqual({});
//     });
//
//     it('getNextOrganizationId - valid', () => {
//         expect(getNextOrganizationId(sampleState))
//             .toEqual(3);
//     });
//
//     it('getNextOrganizationId - empty state - return null', () => {
//         expect(getNextOrganizationId(emptyState))
//             .toBeNull();
//     });
//
//     it('getOrganizationById - valid', () => {
//         expect(getOrganizationById(sampleState, 0))
//             .toEqual(sampleState.organizations[0]);
//     });
//
//     it('getOrganizationById - no such organization - return undefined', () => {
//         expect(getOrganizationById(sampleState, 999))
//             .toBeUndefined();
//     });
//
//     it('getOrganizationById - empty state - return undefined', () => {
//         expect(getOrganizationById(emptyState, 0))
//             .toBeUndefined();
//     });
// });