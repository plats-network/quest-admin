export const checkStartCampaign = (timeToStart) => {
  const startTime = new Date(timeToStart).getTime();
  const now = new Date().getTime();
  if (now - startTime > 0) {
    return true;
  }
  return false;
};