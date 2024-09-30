import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import {
  CreateShowingDto,
  GetShowingsDto,
  IShowing,
  showingRescheduleStatusDto,
  updateShowingStatusDto,
} from "@/shared/interfaces/interfaces";

interface ShowingState {
  showings: Array<IShowing>;
}

const initialState: ShowingState = {
  showings: [],
};

export const showingSlice = createSlice({
  name: "showings",
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.showings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewShowing.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.showings = action.payload.showings;
      }
    });
    builder.addCase(getShowingsByUserId.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.showings = action.payload.showings;
      }
    });
    builder.addCase(updateShowingStatus.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.showings = action.payload.showings;
      }
    });
    builder.addCase(showingReschedule.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.showings = action.payload.showings;
      }
    });
  },
});

export const showingsAction = showingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getShowings = (state: RootState) => state.showing.showings;
export default showingSlice.reducer;

export const createNewShowing = createAsyncThunk(
  "showing/create",
  async (data: CreateShowingDto) => {
    const response = await axios.post("showing/create", data);
    return response.data;
  }
);

export const getShowingsByUserId = createAsyncThunk(
  "showing/get",
  async (data: GetShowingsDto) => {
    const response = await axios.post("showing/get", data);
    return response.data;
  }
);

export const updateShowingStatus = createAsyncThunk(
  "showing/update-status",
  async (data: updateShowingStatusDto) => {
    const response = await axios.put("showing/update-status", data);
    return response.data;
  }
);

export const showingReschedule = createAsyncThunk(
  "showing/reschedule",
  async (data: showingRescheduleStatusDto) => {
    const response = await axios.put("showing/reschedule", data);
    return response.data;
  }
);
