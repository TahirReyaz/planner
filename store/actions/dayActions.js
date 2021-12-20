export const DEL_ACTIVITY = "DEL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";

export const addActivity = (activity, time, color) => {
  return async (dispatch) => {
    const date = new Date();
    dispatch({ type: ADD_ACTIVITY, id: date, activity, time, color });
  };
};

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
