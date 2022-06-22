export const calcRemainingTime = (expirationTime: number) => {
  const curTime = new Date().getTime();
  const expireTime = new Date(expirationTime).getTime();

  return expireTime - curTime;
};

// 返回四捨五入至小數點後第X位
export const roundToX = (num: number, x: number) => {
  return +(Math.round(+(num.toString() + `e+${x}`)) + `e-${x}`);
};
