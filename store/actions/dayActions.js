export const DEL_ACTIVITY = "DEL_ACTIVITY";

export const delActivity = (id) => {
  return async (dispatch) => {
    // const token = getState().auth.token;
    // const response = await fetch(
    //   `https://shop-c9c03-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
    //   {
    //     method: "DELETE",
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error("Something went wrong!");
    // }

    dispatch({ type: DEL_ACTIVITY, actId: id });
  };
};
