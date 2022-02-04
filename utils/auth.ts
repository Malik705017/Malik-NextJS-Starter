export const calcRemainingTime = (expirationTime: number) => {
  const curTime = new Date().getTime();
  const expireTime = new Date(expirationTime).getTime();

  return expireTime - curTime;
};
