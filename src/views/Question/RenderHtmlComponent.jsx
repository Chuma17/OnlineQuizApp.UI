import React, { useState, useEffect } from 'react';

const RenderHtmlComponent = ({ htmlContent }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Assuming htmlContent is the HTML string retrieved from the database
    setContent(htmlContent);
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default RenderHtmlComponent;
