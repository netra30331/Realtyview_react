import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import { IAdvertisement, CreateAdvertisementDto, GetAdvertisementsDto, DeleteAdvertisementsDto } from '@/shared/interfaces/interfaces'

interface AdvertisementState {
  advertisements: Array<IAdvertisement>
}

const initialState: AdvertisementState = {
  advertisements: [],
};

export const advertisementSlice = createSlice({
  name: 'advertisements',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.advertisements = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAdvertisement.fulfilled, (state, action) => {
      if(action.payload.success){
        state.advertisements = action.payload.advertisements;
      }
    });
    builder.addCase(getAdvertisementsFromDB.fulfilled, (state, action) => {
      if(action.payload.success){
        state.advertisements = action.payload.advertisements;
      }
    });
    builder.addCase(updateAdvertisement.fulfilled, (state, action) => {
      if(action.payload.success){
        state.advertisements = action.payload.advertisements;
      }
    });
    builder.addCase(deleteAdvertisements.fulfilled, (state, action) => {
      if(action.payload.success){
        state.advertisements = action.payload.advertisements;
      }
    });
  },
});

export const advertisementsAction = advertisementSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getAdvertisements = (state: RootState) => 
  state.advertisement.advertisements;

export default advertisementSlice.reducer;

export const createAdvertisement = createAsyncThunk(
  'advertisement/create',
  async (data: CreateAdvertisementDto) => {
    const response = await axios.post('advertisement/create', data);
    return response.data;
  }
);

export const updateAdvertisement = createAsyncThunk(
  'advertisement/update',
  async (data: any) => {
    const response = await axios.put('advertisement/update', data);
    return response.data;
  }
);

export const getAdvertisementsFromDB = createAsyncThunk(
  'advertisement/get',
  async (data: GetAdvertisementsDto) => {
    const response = await axios.post('advertisement/get', data);
    return response.data;
  }
);

export const deleteAdvertisements = createAsyncThunk(
  'advertisement/delete',
  async (data: DeleteAdvertisementsDto) => {
    const response = await axios.post('advertisement/delete', data);
    return response.data;
  }
);
