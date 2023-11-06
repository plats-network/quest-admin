export const handleCheckDisable = (isDetail, isEdit, state) => {
  //man detail
    if (isDetail) {
      if (isEdit) {
        return false;
      }
      return true;
      //ko phai man detail
    } else {
      // truong hop setup xong task
      if (state) {
        return true;
      }
      return false;
    }
  };

export const handleCheckDisableRewards = (isDetail, isDeposit,isEdit, state) => {
  if (isDetail && isDeposit) {
    return true;
  }
  else {
    return handleCheckDisable(isDetail, isEdit, state)
  }
}