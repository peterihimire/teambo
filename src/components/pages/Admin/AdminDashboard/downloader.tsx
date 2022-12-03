import Button from "../../../common/Button/Button";

export function downloader(data: any, filename: string) {
  const handleClieDtsDownload = async () => {
    const url = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}${new Date()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Button
      handleClick={handleClieDtsDownload}
      cssClass="btn btn--primary btn--xxsmall btn-icon-n-text radius-6px"
      withIcon={true}
      iconClass="icon-upload m-r-10px"
      btnIcon="icon-upload"
      text="Export"
    />
  );
}
