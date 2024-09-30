import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import {
  CreateLeadDto,
  ILead,
  UpdateLeadDto,
  DeleteLeadsDto,
  GetLeadsDto,
  SearchDto,
  ConvertToClientDto,
  SetRatingDto,
  SetLeadStatusDto,
  SearchAllClientsDto,
} from "@/shared/interfaces/interfaces";

interface LeadState {
  leads: Array<ILead>;
  clients: Array<ILead>;
  keywords: Array<any>;
  amenities: Array<any>;
  schoolDistricts: Array<any>;
}

const initialState: LeadState = {
  leads: [],
  clients: [],
  keywords: [],
  amenities: [],
  schoolDistricts: [],
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.leads = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewLead.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(getLeadsByUserId.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(convertToClientLeads.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(setLeadRating.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(setLeadStatus.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(deleteLeads.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.leads = action.payload.leads;
      }
    });
    builder.addCase(fetchKeywords.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.keywords = action.payload.keywords;
      }
    });
    builder.addCase(fetchAmenities.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.amenities = action.payload.amenities;
      }
    });
    builder.addCase(fetchSchoolDistricts.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.schoolDistricts = action.payload.schoolDistricts;
      }
    });
    builder.addCase(fetchAllClientsByUserId.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.clients = action.payload.clients;
      }
    });
  },
});

export const leadsAction = leadSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getLeads = (state: RootState) => state.lead.leads;
export const getKeywords = (state: RootState) => state.lead.keywords;
export const getAmenities = (state: RootState) => state.lead.amenities;
export const getSchoolDistricts = (state: RootState) =>
  state.lead.schoolDistricts;
export const getClients = (state: RootState) => state.lead.clients;

export default leadSlice.reducer;

export const createNewLead = createAsyncThunk(
  "lead/create",
  async (data: CreateLeadDto) => {
    const response = await axios.post("lead/create", data);
    return response.data;
  }
);

export const updateLead = createAsyncThunk(
  "lead/update",
  async (data: UpdateLeadDto) => {
    const response = await axios.put("lead/update", data);
    return response.data;
  }
);

export const getLeadsByUserId = createAsyncThunk(
  "lead/get",
  async (data: GetLeadsDto) => {
    const response = await axios.post("lead/get", data);
    return response.data;
  }
);

export const deleteLeads = createAsyncThunk(
  "lead/delete",
  async (data: DeleteLeadsDto) => {
    const response = await axios.post("lead/delete", data);
    return response.data;
  }
);

export const convertToClientLeads = createAsyncThunk(
  "lead/convert-to-client",
  async (data: ConvertToClientDto) => {
    const response = await axios.put("lead/convert-to-client", data);
    return response.data;
  }
);

export const setLeadRating = createAsyncThunk(
  "lead/update-rating",
  async (data: SetRatingDto) => {
    const response = await axios.put("lead/update-rating", data);
    return response.data;
  }
);

export const setLeadStatus = createAsyncThunk(
  "lead/update-status",
  async (data: SetLeadStatusDto) => {
    const response = await axios.put("lead/update-status", data);
    return response.data;
  }
);

export const fetchKeywords = createAsyncThunk(
  "other/keywords",
  async (data: SearchDto) => {
    const response = await axios.post("other/keywords", data);
    return response.data;
  }
);
export const fetchAmenities = createAsyncThunk(
  "other/amenities",
  async (data: SearchDto) => {
    const response = await axios.post("other/amenities", data);
    return response.data;
  }
);

export const fetchSchoolDistricts = createAsyncThunk(
  "other/school-districts",
  async (data: SearchDto) => {
    const response = await axios.post("other/school-districts", data);
    return response.data;
  }
);

export const fetchAllClientsByUserId = createAsyncThunk(
  "lead/all-clients/:userId",
  async (data: SearchAllClientsDto) => {
    const response = await axios.post(`lead/all-clients/${data.userId}`, data);
    return response.data;
  }
);
