export const miscsHandler = (miscs) => {
  return miscs.map((misc) => ({ ...misc, quantity: 0 }));
};
