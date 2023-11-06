export const handleCheckDisable = (isDetail, isEdit, state) => {
    if (isDetail) {
      if (isEdit) {
        return false;
      }
      return true;
    } else {
      if (state) {
        return true;
      }
      return false;
    }
  };