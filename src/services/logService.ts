// Type declarations
export interface error {
  error?: any;
}

const log = (error: error) => {
  console.log(error);
  return;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  log,
};
