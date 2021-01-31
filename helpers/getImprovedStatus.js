export const getImprovedStatus = (status) => {
  return (!status) ? 'guest' : (status === 'guest') ? 'friend' : (status === 'friend') ? 'familyMember' : status;
}