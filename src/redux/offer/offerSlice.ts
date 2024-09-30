import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "@/shared/services/axios";
import {
  CreateOfferDto,
  UpdateOfferDto,
  DeleteOffersDto,
  GetOffersDto,
  IOffer,
} from "@/shared/interfaces/interfaces";

interface OfferState {
  offers: Array<IOffer>;
}

const initialState: OfferState = {
  offers: [],
};

export const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.offers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewOffer.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.offers = action.payload.offers;
      }
    });
    builder.addCase(getOffersByUserId.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.offers = action.payload.offers;
      }
    });
    builder.addCase(updateOffer.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.offers = action.payload.offers;
      }
    });
    builder.addCase(deleteOffers.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.offers = action.payload.offers;
      }
    });
  },
});

export const offersAction = offerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getOffers = (state: RootState) => state.offer.offers;
export default offerSlice.reducer;

export const createNewOffer = createAsyncThunk(
  "offer/create",
  async (data: CreateOfferDto) => {
    const response = await axios.post("offer/create", data);
    return response.data;
  }
);

export const updateOffer = createAsyncThunk(
  "offer/update",
  async (data: UpdateOfferDto) => {
    const response = await axios.put("offer/update", data);
    return response.data;
  }
);

export const getOffersByUserId = createAsyncThunk(
  "offer/get",
  async (data: GetOffersDto) => {
    const response = await axios.post("offer/get", data);
    return response.data;
  }
);

export const deleteOffers = createAsyncThunk(
  "offer/delete",
  async (data: DeleteOffersDto) => {
    const response = await axios.post("offer/delete", data);
    return response.data;
  }
);
