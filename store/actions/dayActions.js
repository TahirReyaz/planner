// import { fetchSchedules } from "../../helpers/db";

export const DEL_ACTIVITY = "DEL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const CHANGE_DAY = "CHANGE_DAY";
export const SET_DAY = "SET_DAY";
// export const SET_SCHEDULES = "SET_SCHEDULES";

export const addActivity = (selectedDay, activity, time, color) => {
  return async (dispatch) => {
    const date = new Date();
    dispatch({
      type: ADD_ACTIVITY,
      id: date,
      activity,
      time,
      color,
      selectedDay,
    });
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

export const changeDay = (selectedDay) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_DAY, selectedDay });
  };
};

// export const loadSchedules = () => {
//   return async (dispatch) => {
//     try {
//       const dbResult = await fetchSchedules();
//       dispatch({ type: SET_SCHEDULES, schedules: dbResult.rows._array });
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   };
// };
