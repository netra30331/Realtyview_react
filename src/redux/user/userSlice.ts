import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from '@/shared/services/axios'
import { 
  CreateUserDto, 
  LogInDto, 
  ChangeEmailDto, 
  ChangePasswordDto, 
  UpdateCompanyDto, 
  UpdateMyInfoDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SearchCompaniesDto,
  SearchAddressDto,
  UpdateUserTimezoneDto
} from '@/shared/interfaces/interfaces'

// Define a type for the slice state
interface UserState {
  user: any
  accessToken: string
  zendeskToken: string
  states: Array<any>
  stateAssociations: Array<any>
  localAssociations: Array<any>
  mlsAffiliations: Array<any>
  companies: Array<any>
  addresses: Array<any>
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  accessToken: '',
  zendeskToken:'',
  states: [],
  stateAssociations: [],
  localAssociations: [],
  mlsAffiliations: [],
  companies: [],
  addresses:[],
};

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSignin: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
        state.zendeskToken = action.payload.zendeskToken
      }
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
        state.zendeskToken = action.payload.zendeskToken
      }
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = null
      state.accessToken = ''
    });
    builder.addCase(replaceEmail.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(replacePassword.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(updateCompanyTeamInfo.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(updateMyInfo.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(updateStates.fulfilled, (state, action) => {
      if(action.payload.success){
        state.states = action.payload.states;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(fetchLocalAssociation.fulfilled, (state, action) => {
      if(action.payload.success){
        state.localAssociations = action.payload.localAssociations;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(fetchStateAssociation.fulfilled, (state, action) => {
      if(action.payload.success){
        state.stateAssociations = action.payload.stateAssociations;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(fetchMLSAssociation.fulfilled, (state, action) => {
      if(action.payload.success){
        state.mlsAffiliations = action.payload.mlsAffiliations;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(fetchRelevantCompanies.fulfilled, (state, action) => {
      if(action.payload.success){
        state.companies = action.payload.companies;
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(fetchAddressAutocomplete.fulfilled, (state, action) => {
      if(action.payload.success){
        state.addresses = [...action.payload.addresses];
        state.accessToken = action.payload.accessToken
      }
    });
    builder.addCase(updateUserTimezone.fulfilled, (state, action) => {
      if(action.payload.success){
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken
      }
    })
  },
});

export const usersAction = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUser = (state: RootState) => state.user.user;
export const getStates = (state: RootState) => state.user.states;
export const getStateAssociations = (state: RootState) => state.user.stateAssociations;
export const getLocalAssociations = (state: RootState) => state.user.localAssociations;
export const getMLSAssociations = (state: RootState) => state.user.mlsAffiliations;
export const getCompanies = (state: RootState) => state.user.companies;
export const getAddresses = (state: RootState) => state.user.addresses;
export const getZendeskToken = (state: RootState) => state.user.zendeskToken;
export default userSlice.reducer;

export const signIn = createAsyncThunk(
  'user/login',
  async (data: LogInDto) => {
    const response = await axios.post('user/login', data);
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'user/register',
  async (data: CreateUserDto) => {
    const response = await axios.post('user/register', data);
    return response.data;
  }
);

export const replaceEmail = createAsyncThunk(
  'user/change-email',
  async (data: ChangeEmailDto) => {
    const response = await axios.put('user/change-email', data);
    return response.data;
  }
);

export const replacePassword = createAsyncThunk(
  'user/change-password',
  async (data: ChangePasswordDto) => {
    const response = await axios.put('user/change-password', data);
    return response.data;
  }
);

export const updateCompanyTeamInfo = createAsyncThunk(
  'user/update-company',
  async (data: UpdateCompanyDto) => {
    const response = await axios.put('user/update-company', data);
    return response.data;
  }
);

export const updateMyInfo = createAsyncThunk(
  'user/update-myinfo',
  async (data: UpdateMyInfoDto) => {
    const response = await axios.put('user/update-myinfo', data);
    return response.data;
  }
);

export const updateStates = createAsyncThunk(
  'user/state',
  async () => {
    const response = await axios.get('user/state');
    return response.data;
  }
);
export const forgotPassword = createAsyncThunk(
  'user/forgot-password',
  async (data: ForgotPasswordDto) => {
    const response = await axios.post('user/forgot-password', data);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'user/reset-password',
  async (data: ResetPasswordDto) => {
    const response = await axios.post('user/reset-password', data);
    return response.data;
  }
);

export const fetchStateAssociation = createAsyncThunk(
  'user/stateAssociation',
  async () => {
    const response = await axios.get('user/stateAssociation');
    return response.data;
  }
);
export const fetchLocalAssociation = createAsyncThunk(
  'user/localAssociation',
  async () => {
    const response = await axios.get('user/localAssociation');
    return response.data;
  }
);
export const fetchMLSAssociation = createAsyncThunk(
  'user/mlsAssociation',
  async () => {
    const response = await axios.get('user/mlsAssociation');
    return response.data;
  }
);
export const fetchRelevantCompanies = createAsyncThunk(
  'user/companies',
  async (data: SearchCompaniesDto) => {
    const response = await axios.post('user/companies', data);
    return response.data;
  }
);
export const fetchAddressAutocomplete = createAsyncThunk(
  'user/address-auto-complete',
  async (data: SearchAddressDto) => {
    
    const response = await axios.get('user/address-auto-complete?address='+data.address);
    console.log(response.data, data)
    return response.data;
  }
);
export const logOut = createAsyncThunk(
  'user/logout',
  async () => {
    return 'logout';
  }
);

export const updateUserTimezone  = createAsyncThunk(
  'user/set-timezone',
  async (data: UpdateUserTimezoneDto) => {
    const response = await axios.put('user/set-timezone', data);
    console.log(response.data)
    return response.data;
  }
);

