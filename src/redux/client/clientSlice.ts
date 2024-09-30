import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import { CreateClientDto, ILead, UpdateClientDto, DeleteClientsDto, GetClientsDto } from '@/shared/interfaces/interfaces'

interface ClientState {
  clients: Array<ILead>
}

const initialState: ClientState = {
  clients: [],
};

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.clients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewClient.fulfilled, (state, action) => {
      if(action.payload.success){
        state.clients = action.payload.clients;
      }
    });
    builder.addCase(getClientsByUserId.fulfilled, (state, action) => {
      if(action.payload.success){
        state.clients = action.payload.clients;
      }
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      if(action.payload.success){
        state.clients = action.payload.clients;
      }
    });
    builder.addCase(deleteClients.fulfilled, (state, action) => {
      if(action.payload.success){
        state.clients = action.payload.clients;
      }
    });
  },
});

export const clientsAction = clientSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getClients = (state: RootState) => 
  state.client.clients;

export default clientSlice.reducer;

export const createNewClient = createAsyncThunk(
  'client/create',
  async (data: CreateClientDto) => {
    const response = await axios.post('client/create', data);
    return response.data;
  }
);

export const updateClient = createAsyncThunk(
  'client/update',
  async (data: UpdateClientDto) => {
    const response = await axios.put('client/update', data);
    return response.data;
  }
);

export const getClientsByUserId = createAsyncThunk(
  'client/get',
  async (data: GetClientsDto) => {
    const response = await axios.post('client/get', data);
    return response.data;
  }
);

export const deleteClients = createAsyncThunk(
  'client/delete',
  async (data: DeleteClientsDto) => {
    const response = await axios.post('client/delete', data);
    return response.data;
  }
);
