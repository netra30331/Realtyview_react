import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import {
  CreateMyListingDto,
  UpdateMyListingDto,
  DeleteMyListingsDto,
  GetMyListingsDto,
  IMyListing,
  ListingSearchDto,
  ListingAdvancedSearchDto,
  FavoriteMyListingsDto,
  SetListingStatusDto,
} from "@/shared/interfaces/interfaces";

interface MyListingState {
  myListings: Array<IMyListing>;
  listingsForOffer: Array<IMyListing>;
  listingsForAdvancedSearch: Array<IMyListing>;
}

const initialState: MyListingState = {
  myListings: [],
  listingsForOffer: [],
  listingsForAdvancedSearch: [],
};

export const myListingSlice = createSlice({
  name: "myListings",
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.myListings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewMyListing.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
    builder.addCase(getMyListingsByUserId.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
    builder.addCase(updateMyListing.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
    builder.addCase(favoriteMyListing.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
    builder.addCase(deleteMyListings.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
    builder.addCase(
      getListingsByAddressOrMLSNumber.fulfilled,
      (state, action) => {
        if (action.payload.success) {
          state.listingsForOffer = action.payload.listingsForOffer;
        }
      }
    );
    builder.addCase(getListingsByAdvancedSearch.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.listingsForAdvancedSearch =
          action.payload.listingsForAdvancedSearch;
      }
    });
    builder.addCase(setListingStatus.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.myListings = action.payload.listings;
      }
    });
  },
});

export const listingsAction = myListingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getMyListings = (state: RootState) => state.myListing.myListings;
export const getListingsForOffer = (state: RootState) =>
  state.myListing.listingsForOffer;
export const getListingsForAdvancedSearch = (state: RootState) =>
  state.myListing.listingsForAdvancedSearch;
export default myListingSlice.reducer;

export const createNewMyListing = createAsyncThunk(
  "listing/create",
  async (data: CreateMyListingDto) => {
    const response = await axios.post("listing/create", data);
    return response.data;
  }
);

export const updateMyListing = createAsyncThunk(
  "listing/update",
  async (data: UpdateMyListingDto) => {
    const response = await axios.put("listing/update", data);
    return response.data;
  }
);

export const getMyListingsByUserId = createAsyncThunk(
  "listing/get",
  async (data: GetMyListingsDto) => {
    const response = await axios.post("listing/get", data);
    return response.data;
  }
);

export const favoriteMyListing = createAsyncThunk(
  "listing/favorite",
  async (data: FavoriteMyListingsDto) => {
    const response = await axios.post("listing/favorite", data);
    return response.data;
  }
);

export const deleteMyListings = createAsyncThunk(
  "listing/delete",
  async (data: DeleteMyListingsDto) => {
    const response = await axios.post("listing/delete", data);
    return response.data;
  }
);

export const getListingsByAddressOrMLSNumber = createAsyncThunk(
  "listing/search",
  async (data: ListingSearchDto) => {
    const response = await axios.get(
      `listing/search?userId=${data.userId}&query=${data.query}`
    );
    return response.data;
  }
);

export const getListingsByAdvancedSearch = createAsyncThunk(
  "listing/advanced-search",
  async (data: ListingAdvancedSearchDto) => {
    const response = await axios.post(`listing/advanced-search`, data);
    return response.data;
  }
);

export const setListingStatus = createAsyncThunk(
  "listing/update-status",
  async (data: SetListingStatusDto) => {
    const response = await axios.put(`listing/update-status`, data);
    return response.data;
  }
);
