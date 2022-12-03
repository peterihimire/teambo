import authService from "../services/authService";

export const convertToFormData = (obj: Record<string, any>): FormData => {
	// Declare form data
	const formData = new FormData();

	// Append all data to form data
	Object.entries(obj).forEach(entry => {
    const [key, value] = entry;
    if (Array.isArray(value)) {
      value.forEach(item => 
         { formData.append(key, item);}
        )
    }
    else {

      formData.append(key, value);
    }
	});

	return formData;
};



type atachmentUrlProps = {
    attachmentName: string,
    id: string,
    action?: string,
    type: string
}

const assetToken = authService.getAssetToken();

export const getAttachmentUrl = ({attachmentName, id, action = "read", type, }: atachmentUrlProps) => {
    return (
      "https://api.jointimbo.com/app/assets?cId=" +
      id + `&action=${action}` +
      "&fl=" +
      attachmentName + `&type=${type}`+
      "&at=" +
      assetToken
    );
  };