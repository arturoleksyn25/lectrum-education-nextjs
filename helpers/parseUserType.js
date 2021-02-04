export const parseUserType = (visitCounts) => {
  return (visitCounts < 3) ? 'guest' : (visitCounts >= 3 && visitCounts < 5) ? 'friend' : 'familyMember';
}