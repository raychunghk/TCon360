import { gql } from 'graphql-request';

export const submitLeaveRequest = async (leaveRequest) => {
  const mutation = gql`
    mutation CreateLeaveRequest($leaveRequest: LeaveRequestInput!) {
      createLeaveRequest(leaveRequest: $leaveRequest) {
        id
        leavePeriodStart
        AMPMStart
        leavePeriodEnd
        AMPMEnd
        leaveDays
        dateOfReturn
        staffSignDate
        staff {
          id
          StaffName
          AgentName
          StaffCategory
          Department
          PostUnit
          ManagerName
          ManagerTitle
          ManagerEmail
        }
      }
    }
  `;

  const variables = {
    leaveRequest,
  };

  const endpoint = '/api/graphql';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation.loc.source.body,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.createLeaveRequest;
};