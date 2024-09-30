import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import { IMyInfo, CreateAgentDto, UpdateAgentDto, DeleteAgentsDto, GetAgentsDto, SearchAgentsDto } from '@/shared/interfaces/interfaces'

interface AgentState {
  agents: Array<IMyInfo>
}

const initialState: AgentState = {
  agents: [],
};

export const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<any>) => {
      state.agents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewAgent.fulfilled, (state, action) => {
      if(action.payload.success){
        state.agents = action.payload.agents;
      }
    });
    builder.addCase(getAgentsByUserId.fulfilled, (state, action) => {
      if(action.payload.success){
        state.agents = action.payload.agents;
      }
    });
    builder.addCase(updateAgent.fulfilled, (state, action) => {
      if(action.payload.success){
        state.agents = action.payload.agents;
      }
    });
    builder.addCase(deleteAgents.fulfilled, (state, action) => {
      if(action.payload.success){
        state.agents = action.payload.agents;
      }
    });
  },
});

export const agentsAction = agentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getAgents = (state: RootState) => 
  state.agent.agents;

export default agentSlice.reducer;

export const createNewAgent = createAsyncThunk(
  'agent/create',
  async (data: CreateAgentDto) => {
    const response = await axios.post('agent/create', data);
    return response.data;
  }
);

export const updateAgent = createAsyncThunk(
  'agent/update',
  async (data: UpdateAgentDto) => {
    const response = await axios.put('agent/update', data);
    return response.data;
  }
);

export const getAgentsByUserId = createAsyncThunk(
  'agent/get',
  async (data: GetAgentsDto) => {
    const response = await axios.post('agent/get', data);
    return response.data;
  }
);

export const advancedSearchAgents = createAsyncThunk(
  'agent/search',
  async (data: SearchAgentsDto) => {
    const response = await axios.post('agent/search', data);
    return response.data;
  }
);

export const deleteAgents = createAsyncThunk(
  'agent/delete',
  async (data: DeleteAgentsDto) => {
    const response = await axios.post('agent/delete', data);
    return response.data;
  }
);
