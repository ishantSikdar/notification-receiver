import React, { useState } from 'react';

const CopyToClipboardButton = ({ textToCopy }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }

    // Clear the success message after 2 seconds
    setTimeout(() => {
      setCopySuccess('');
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleCopyClick}>Copy Token</button>
      {copySuccess && <div>{copySuccess}</div>}
    </div>
  );
};

export default CopyToClipboardButton;
