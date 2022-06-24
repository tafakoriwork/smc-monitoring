import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    messages: [],
  },
  reducers: {
    clearEvents: (state) => {
        state.messages = [{
            type: "success",
            text: `# all events cleared!`,
          }];
    },
    setEvent: (state, action) => {
        
      if (Object.values(state.users).includes(action.payload.username)) {
        state.messages.unshift({
          type: "error",
          text: `# username is existed before, please enter another!`,
        });
      }
      else if (action.payload.password.length < 8) {
        state.messages.unshift({
          type: "error",
          text: `# password must be greater than 8 character or number!`,
        });
      }
      else {
      state.users.push(action.payload.username);
      state.messages.unshift({
        type: "success",
        text: `# user: {${action.payload.username}} with role {${
          action.payload.is_admin ? "admin" : "not admin"
        }} added succesfully`,
      });
    }
    },
  },
});

export const { setEvent, clearEvents } = userSlice.actions;

export const userEvents = (state) => state.user.messages;

export default userSlice.reducer;
