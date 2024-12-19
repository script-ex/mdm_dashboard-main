const MDM_BASE_URL = '/surveys/mdm/:mdmId';
let MDM_ID = undefined;

export const setMDMId = (mdmId) => {
  MDM_ID = mdmId;
};

export const getMDMBaseUrl = () => {
  if (!MDM_ID) {
    return MDM_BASE_URL.replace('/:mdmId', '');
  }
  return MDM_BASE_URL.replace(':mdmId', MDM_ID);
};

export const downloadAsFile = (json, fileName) => {
  // Create a blob from the JSON data
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;

  // Append the link to the DOM and trigger the download
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Clean up
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadLink.href);
};

export const removeBulletAndSpaces = (str) => {
  if (typeof str !== 'string') return str;
  if (!str) return '';
  return str.replace(/•/g, '').trim();
};
