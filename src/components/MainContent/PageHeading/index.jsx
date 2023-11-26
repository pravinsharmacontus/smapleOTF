import React from 'react';

const PageHeading = (props = {}) => {
  const {
    Title = "",
    CustomClass = ""
  } = props;

  return (
    <div
      className={`${CustomClass ? CustomClass : ""} Heading `}
    >
      <h2>{Title}</h2>
    </div>

  );
};
export default React.memo(PageHeading);
