import copy from "copy-to-clipboard";

const copyToClipBoard = (elementId: string) => {
  let copyText: any = document.getElementById(`${elementId}`);
  let vv: string = copyText.value;
  copy(vv);
  //   copyText?.select();
  //   document.execCommand("copy");
};

export default copyToClipBoard;
