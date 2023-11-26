import { memo } from "react";

const AutoFocusUtility = () => {
  return (
    <>
      {/* // don't remove the button, this will help tab navigation functionality  */}
      <button style={{ position: "absolute", zIndex: "-999", opacity: 0 }
      } type="button" name="autoFocus" autoFocus={true}></button >
    </>
  );
}
export default memo(AutoFocusUtility);
