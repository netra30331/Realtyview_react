export enum ConnectStatus {
  UnConnected,
  Connected,
  TopPoriority,
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  licenseState: string;
  licenseType: string;
}

export interface LogInDto {
  email: string;
  password: string;
}

export interface SelectType {
  value: string;
  label: string;
}

export interface ChangeEmailDto {
  email: string;
  updatedEmail: string;
}

export interface ChangePasswordDto {
  email: string;
  password: string;
  updatedPassword: string;
}

export interface ISocial {
  platform: string;
  link: string;
}

export interface ICurrentTabInfo {
  tab: string;
  id: any;
}

export interface IMyInfo {
  // General Details
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  officeNumber: string;
  contactEmail: string;
  avatarURL: string;
  memberID?: number;
  coverPhotoURL?: string;
  description?: string;
  favorite?: string;
  isActive?: string;
  // License Details
  licenseNumber: string;
  licenseState: string;
  licenseType: string;
  licenseDate: undefined | Date;
  licenseExpiration: undefined | Date;
  //Associations
  localAssociations: Array<string>;
  stateAssociations: Array<string>;
  mlsAssociations: Array<string>;
  // Serviced Areas
  serviceAreas: Array<string>;
  // Social Profile
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  // Professional Profiles
  zillow: string;
  homes: string;
  realtor: string;
  ratemyagent: string;
  // Company info
  company?: ICompanyInfo;
  currentTab?: ICurrentTabInfo;
  // favorites
  favorites?: Array<string>;
}

export interface ICompanyInfo {
  companyId: string;
  businessName: string;
  businessAddress1: string;
  businessAddress2: string;
  businessCity: string;
  state: string;
  businessZip: string;
  county: string;
  businessLogo: string;
  isProfile: number;
  principalBrokerFirstName: string;
  principalBrokerLastName: string;
  principalBrokerEmail: string;
  principalBrokerPhone: string;
}

export interface ICompanyTeamInfo {
  companyId: string;
  businessName: string;
  businessAddress1: string;
  businessAddress2: string;
  businessCity: string;
  state: string;
  businessZip: string;
  county: string;
  businessLogo: string;
  isProfile: number;
  principalBrokerFirstName: string;
  principalBrokerLastName: string;
  principalBrokerEmail: string;
  principalBrokerPhone: string;
  teamName: string;
  teamLogo: string;
  teamLeaderFirstName: string;
  teamLeaderLastName: string;
  teamLeaderBrokerEmail: string;
  teamLeaderPhone: string;
}

export interface UpdateCompanyDto {
  email: string;
  data: ICompanyTeamInfo;
}

export interface UpdateMyInfoDto {
  email: string;
  data: IMyInfo;
}

export interface ILead {
  // Main
  _id: string;
  leadType: string;
  leadStatus: string;
  dateAdded: Date;
  leadSource: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  emailAddress: string;

  secondaryFirstName: string;
  secondaryLastName: string;
  secondaryPhoneNumber: string;
  secondaryEmailAddress: string;
  // Buyer
  buyerLocationsMulti: Array<string>;
  buyerSchoolDistrictsMulti: Array<string>;
  buyerPropertyType: string;
  buyerPropertySubType: string;
  buyerUnitCount: number;
  buyerMinimumHomeSqFt: number;
  buyerMinimumLotSqFt: number;
  buyerStories: string;
  buyerParking: string;
  buyerMinimumBedrooms: number;
  buyerMinimumBathrooms: number;
  buyerHeating: string;
  buyerHeatingTypeMulti: Array<string>;
  buyerCooling: string;
  buyerCoolingTypeMulti: Array<string>;
  buyerGarage: string;
  buyerViewsMulti: Array<string>;
  buyerPool: string;
  buyerIsAttached: string;
  buyerNewConstruction: string;
  buyerAmenitiesMulti: Array<string>;
  buyerKeywordsMulti: Array<string>;

  //pre-approval details
  buyerIsPreApproved: string;
  buyerMaximumPurchasPrice: number;
  buyerLoanOfficerFirstName: string;
  buyerLoanOfficerLastName: string;
  buyerLoanOfficerPhone: string;
  buyerLoanOfficerEmail: string;
  buyerLenderCompany: string;
  buyerPreApprovalIssueDate: undefined | Date;
  buyerPreApprovalExpirationDate: undefined | Date;
  buyerPrimaryBorrower: string;
  buyerSecondaryBorrower: string;
  buyerLoanType: string;
  buyerPurchasPrice: number;
  buyerSellerConsession: string;
  buyerDownPaymentAmount: number;
  buyerBaseLoanAmount: number;
  buyerLoanToValue: number;
  buyerAnnualTaxes: number;
  buyerAnnualInsurance: number;
  buyerAnnualHOADues: number;
  buyerMortgageRate: number;
  buyerAnnualOtherExpenses: number;
  buyerLenderCredit: number;

  // Seller
  sellerListPrice: string;
  sellerPropertyAddress: string;
  sellerUnit: string;
  sellerSchoolDistrictsMulti: Array<string>;
  sellerPropertyType: string;
  sellerPropertySubType: string;
  sellerUnitCount: number;
  sellerStories: string;
  sellerHomeSqFt: number;
  sellerLotSqFt: number;
  sellerBedrooms: number;
  sellerBathrooms: number;
  sellerParking: string;
  sellerGarage: string;
  sellerHeating: string;
  sellerHeatingTypeMulti: Array<string>;
  sellerCooling: string;
  sellerCoolingTypeMulti: Array<string>;
  sellerViewsMulti: Array<string>;
  sellerPool: string;
  sellerIsAttached: number;
  sellerNewConstruction: number;
  sellerAmenitiesMulti: Array<string>;
  sellerKeywordsMulti: Array<string>;
  sellerPropertyDescription: string;

  sellerIsPreForeclosure: string;
  sellerOccupancyStatus: string;
  sellerAnnualHOADues: string;
  sellerAnnualTaxes: number;
  sellerAnnualOtherExpenses: number;
  sellerVillageAnnualTaxes: number;

  // Renter
  renterLocationsMulti: Array<string>;
  renterSchoolDistrictsMulti: Array<string>;
  renterMinimumBedrooms: number;
  renterMinimumBathrooms: number;
  renterMinimumLotSize: number;
  renterStories: number;
  renterPropertyType: string;
  renterMaximumMonthlyPayment: string;
  renterMinimumHomeSqFt: number;
  renterHeatingAndCooling: string;
  renterGarage: string;
  renterViewsMulti: Array<string>;
  renterParkingMulti: Array<string>;
  renterAttachedOk: string;
  renterNewConstructionOnly: string;
  renterAmenities: string;
  renterKeywords: string;
  // Landlord
  landlordPropertyAddress: string;
  landlordUnit: string;
  landlordPropertyType: string;
  landlordPropertySubType: string;
  landlordListingType: string;
  landlordOccupancyStatus: string;
  landlordListPrice: number;
  landlordAssertType: string;
  landlordBuildingClass: string;
  landlordNumberOfUnits: number;
  landlordBedrooms: number;
  landlordBathrooms: number;
  landlordHomeSqFt: number;
  landlordLotSqFt: number;
  landlordStories: string;
  landlordParking: string;
  landlordHeatingAndCooling: string;
  landlordGarage: string;
  landlordViews: string;
  landlordPool: string;
  landlordAttached: string;
  landlordNewConstruction: string;
  landlordAmenities: string;
  landlordKeywords: string;
  landlordPropertyDescription: string;

  //note
  about: string;
  lastContact: undefined | Date;
  nextContact: undefined | Date;
  startOfTarget: undefined | Date;
  endOfTarget: undefined | Date;
  rating: string;
}

export interface CreateLeadDto {
  email: string;
  data: ILead;
  userId: string;
  search: GetLeadsDto;
}

export interface UpdateLeadDto {
  data: ILead;
  leadId: string;
  userId: string;
  search: GetLeadsDto;
}

export interface DeleteLeadsDto {
  ids: Array<string>;
  userId: string;
  search: GetLeadsDto;
}

export interface IKeywords {
  name: string;
  phone: string;
  email: string;
}

export interface GetLeadsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
}

export interface ConvertToClientDto {
  leadId: string;
  toClient: boolean;
  search: GetLeadsDto;
}

export interface SetRatingDto {
  leadId: string;
  rating: string;
  search: GetLeadsDto;
}

export interface SetLeadStatusDto {
  leadId: string;
  leadStatus: string;
  search: GetLeadsDto;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  code: string;
  password: string;
}

export interface SearchCompaniesDto {
  query: string;
}

export interface SearchDto {
  query: string;
}

export interface SearchAllClientsDto {
  query: string;
  type: string;
  userId: string;
}
export interface SearchAddressDto {
  address: string;
}

export interface UpdateUserTimezoneDto {
  email: string;
  timezone: string;
}
// export interface IClient {
//     // frontend
//     createdAt?: string
//     // Main
//     leadType: string
//     leadStatus: string
//     dateAdded: Date
//     leadSource: string
//     firstName: string
//     lastName: string
//     companyName: string
//     phoneNumber: string
//     email: string
//     address: string
//     emailAddress: string
//     // Buyer
//     buyerSecondaryFirstName: string
//     buyerSecondaryLastName: string
//     buyerSecondaryPhoneNumber: string
//     buyerSecondaryEmailAddress: string
//     buyerLocationsMulti: Array<string>
//     buyerSchoolDistrictsMulti: Array<string>
//     buyerMinimumBedrooms: number
//     buyerMinimumBathrooms: number
//     buyerMinimumSqFt: number
//     buyerMinimumLotSize: number
//     buyerMaximumPurchasePirce: number
//     buyerIsPreApproved: string
//     buyerLenderCompany: string
//     buyerLoanOfficerFirstName: string
//     buyerLoanOfficerLastName: string
//     buyerLoanOfficerPhone: string
//     buyerLoanOfficerEmail: string
//     // Seller
//     sellerSecondaryFirstName: string
//     sellerSecondaryLastName: string
//     sellerSecondaryPhoneNumber: string
//     sellerSecondaryEmailAddress: string
//     sellerPropertyAddress: string
//     sellerUnit: string
//     sellerPropertyType: string
//     sellerUnitCount: number
//     sellerIsAttached: string
//     sellerParkingMulti: Array<string>
//     sellerBedrooms: number
//     sellerBathrooms: number
//     sellerSqFt: number
//     sellerLotSize: number
//     sellerFeaturesMulti: Array<string>
//     sellerSchoolDistrictsMulti: Array<string>
//     sellerSuggestedListPrice: number
//     sellerAnnualTaxes: number
//     sellerMonthlyHOA: number
//     sellerOtherMonthlyCharges: number
//     // Renter
//     renterSecondaryFirstName: string
//     renterSecondaryLastName: string
//     renterSecondaryPhoneNumber: string
//     renterSecondaryEmailAddress: string
//     renterLocationsMulti: Array<string>
//     renterSchoolDistrictsMulti: Array<string>
//     renterMinimumBedrooms: number
//     renterMinimumBathrooms: number
//     renterMinimumLotSize: number
//     renterStories: number
//     renterPropertyType: number
//     renterMinimumHomeSqFt: number
//     // Landlord
//     landlordSecondaryFirstName: string
//     landlordSecondaryLastName: string
//     landlordSecondaryPhoneNumber: string
//     landlordSecondaryEmailAddress: string
//     landlordPropertyAddress: string
//     landlordUnit: string
//     landlordPropertyType: string
//     landlordPropertySubType: string
//     landlordListingType: string
//     landlordOccupancyStatus: string
//     landlordListPrice: number
//     landlordAssertType: string
//     landlordBuildingClass: string
//     landlordNumberOfUnits: number
//     landlordBedrooms: number
//     landlordBathrooms: number
//     landlordHomeSqFt: number
//     landlordLotSqFt: number
//     landlordStories: string
//     landlordParking: string
//     landlordHeatingAndCooling: string
//     landlordGarage: string
//     landlordViews: string
//     landlordPool: string
//     landlordAttached: string
//     landlordNewConstruction: string
//     landlordAmenities: string
//     landlordKeywords: string
//     landlordPropertyDescription: string
// }

export interface CreateClientDto {
  email: string;
  data: ILead;
  userId: string;
  search: GetLeadsDto;
}

export interface UpdateClientDto {
  data: ILead;
  leadId: string;
  userId: string;
  search: GetLeadsDto;
}

export interface DeleteClientsDto {
  ids: Array<string>;
  userId: string;
  search: GetClientsDto;
}

export interface GetClientsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
}

export interface IMyListing {
  // Main
  _id?: string;
  listingType: string;
  client: string; // temporary

  // Primary Seller Details
  primarySellerFirstName: string;
  primarySellerLastName: string;
  primarySellerCompanyName: string;
  primarySellerPhoneNumber: string;
  primarySellerEmailAddress: string;
  primarySellerCurrentAddress: string;
  primarySellerMailingAddress: string;

  // Secondary Seller Details
  secondarySellerFirstName: string;
  secondarySellerLastName: string;
  secondarySellerPhoneNumber: string;
  secondarySellerEmailAddress: string;

  // Property & Listing Details
  listingNotes: string;
  listingAddress: string;
  listingUnit: string;
  listingNeigborhood: string;
  listingMlsNumber: string;
  listingDateListed: undefined | Date;
  listingExpirationDate: undefined | Date;
  //listingType: string
  listingSaleType: string;
  listingListPrice: number;
  listingAnnualTaxes: number;
  listingHoaExpenses: number;
  listingOtherMonthlyExpenses: number;
  listingOccupancyStatus: string;
  listingLisPendens: string;

  propertyType: string;
  propertySubType: string;
  propertyBedrooms: string;
  propertyBathrooms: string;
  propertyHomeSqft: string;
  propertyLotSqft: string;
  propertyStories: string;
  propertyNumberOfUnits: string;
  propertyParking: string;
  propertyCooling: string;
  propertyHeating: string;
  propertyGarage: string;
  propertyViews: Array<string>;
  propertyPool: string;
  propertyAttached: string;
  propertyNewConstruction: string;
  propertyAmenities: Array<string>;
  propertyKeywords: Array<string>;
  propertyDescription: string;

  // Property Photos
  propertyPhotos: Array<any>;

  // Showing Instructions
  showingInstuction: string;
  showingRemarks: string;
  showingLockboxOrKeypad: string;
  showingAccessCode: string;
  showingOccupanyStatus: string;
  showingRequireAgencyDisclosure: string;
  showingAvailability: MyListingShowingAvailability;
}

export interface MyListingPhoto {
  file: File;
  caption: string;
  order: number;
}

export interface MyListingShowingAvailability {
  monday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  tuesday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  wednesday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  thursday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  friday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  saturday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
  sunday: {
    isSelected: boolean;
    time: Array<MyListingShowingAvailabilityTime>;
  };
}

export interface MyListingShowingAvailabilityDay {
  isSelected: boolean;
  time: Array<MyListingShowingAvailabilityTime>;
}

export interface MyListingShowingAvailabilityTime {
  timeStart: string;
  timeEnd: string;
}

export interface CreateMyListingDto {
  email: string;
  data: IMyListing;
  userId: string;
  search: GetMyListingsDto;
}

export interface UpdateMyListingDto {
  data: IMyListing;
  listingId: string;
  userId: string;
  search: GetMyListingsDto;
}

export interface FavoriteMyListingsDto {
  id: string;
  isFavorite: number;
  userId: string;
  search: GetMyListingsDto;
}

export interface DeleteMyListingsDto {
  ids: Array<string>;
  userId: string;
  search: GetMyListingsDto;
}

export interface SetListingStatusDto {
  listingId: string;
  listingStatus: string;
  search: GetMyListingsDto;
}

export interface GetMyListingsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  status: string;
}

export interface ListingSearchDto {
  userId: string;
  query: string;
}

export interface ListingAdvancedSearchDto {
  query?: string;
  propertyType?: string;
  propertySubType?: string;
  propertyBedrooms?: string;
  propertyBathrooms?: string;
  companyOnly: boolean;
  teamOnly: boolean;
}

export interface IImageObject {
  src: string;
}

export interface IDocumentObject {
  isFile: false;
  docType?: string;
  rename?: string;
  file?: File | null;
  uploadAt?: Date | null;
}

export interface IShowing {
  _id: string;
  status: string;
  listing: string;
  dateTime: Date;
}

export interface IOffer {
  listing: string;
  client: string;
  // Primary Buyer Details
  primaryBuyerFirstName: string;
  primaryBuyerLastName: string;
  primaryBuyerCompanyName: string;
  primaryBuyerPhoneNumber: string;
  primaryBuyerEmailAddress: string;
  primaryBuyerCurrentAddress: string;
  primaryBuyerMailingAddress: string;

  // Secondary Buyer Details
  secondaryBuyerFirstName: string;
  secondaryBuyerLastName: string;
  secondaryBuyerPhoneNumber: string;
  secondaryBuyerEmailAddress: string;

  // Mortgage
  mortgageHeldBy: string;
  mortgageType: string;
  mortgagePeriod: string;
  paymentDate: string;
  interestRate: string;
  monthlyPayment: string;
  mortgageProposedClosingDate: undefined | Date;
  mortgageProposedFormalContactDate: undefined | Date;
  mortgageDays: string;

  //Loan Officer
  loanFirstName: string;
  loanLastName: string;
  loanPhoneNumber: string;
  loanEmailAddress: string;
  loanCompany: string;
  loanCompanyAddress: string;

  //Terms and Conditions
  offerAmount: string;
  earnestMoneyDeposit: string;
  downPayment: string;
  subjectToMortgage: string;
  sellerConcession: string;
  cashOnClosing: string;
  proposedClosingLocation: string;
  proposedClosingDate: undefined | Date;
  personalPropertyInclusions: string;
  personalPropertyExclusions: string;
  noteToListingAgent: string;

  //Buyer's Attorney
  buyeraAttorneyFirstName: string;
  buyerAttorneyLastName: string;
  buyerAttorneyPhoneNumber: string;
  buyerAttorneyEmailAddress: string;
  buyerAttorneyCompany: string;
  buyerAttorneyAddress: string;

  //Seller's Attorney
  sellerAttorneyFirstName: string;
  sellerAttorneyLastName: string;
  sellerAttorneyPhoneNumber: string;
  sellerAttorneyEmailAddress: string;
  sellerAttorneyCompany: string;
  sellerAttorneyAddress: string;

  documents: Array<IDocumentObject>;
  status: string;
}
export interface ProfessionalProfile {
  name: string;
  value: string;
}

export interface CreateAgentDto {
  agent: IMyInfo;
}

export interface UpdateAgentDto {
  agent: IMyInfo;
}

export interface DeleteAgentsDto {
  ids: Array<string>;
  userId: string;
  search: GetAgentsDto;
}

export interface GetAgentsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  searchData?: IMyInfo;
}

export interface SearchAgentsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  searchData: IMyInfo;
}

export interface CreateShowingDto {
  email: string;
  data: IShowing;
  userId: string;
}

export interface GetShowingsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  status: string;
  sentStatus: string;
}

export interface updateShowingStatusDto {
  showingId: string;
  status: string;
  userId: string;
  search: GetShowingsDto;
}

export interface showingRescheduleStatusDto {
  showingId: string;
  userId: string;
  dateTime: Date;
  search: GetShowingsDto;
}

export interface GetOffersDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  status: string;
}

export interface UpdateOfferDto {
  email: string;
  data: IOffer;
  offerId: string;
  userId: string;
  search: GetOffersDto;
}

export interface CreateOfferDto {
  email: string;
  data: IOffer;
  listingId: string;
  userId: string;
  search: GetOffersDto;
}

export interface DeleteOffersDto {
  ids: Array<string>;
  userId: string;
  search: GetOffersDto;
}

export interface IAdvertisement {
  _id?: string;
  adImageURL: string;
  adTitle: string;
  adContent: string;
  adLinkURL: string;
  adButtonLabel: string;
  adMute?: number;
  status?: string;
}

export interface GetAdvertisementsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
  status: string;
}

export interface CreateAdvertisementDto {
  data: IAdvertisement;
  search: GetAdvertisementsDto;
}

export interface UpdateAdvertisementDto {
  data: IAdvertisement;
  id: string;
  search: GetAdvertisementsDto;
}

export interface DeleteAdvertisementsDto {
  ids: Array<string>;
  search: GetAdvertisementsDto;
}

export interface IPost {
  _id?: string;
  postTitle: string;
  postContent: string;
  postImportanceLevel?: number;
}

export interface GetPostsDto {
  keyword: string;
  sortType: string;
  sortField: string;
  userId: string;
  recordsPerPage: number;
  currentPage: number;
}

export interface CreatePostDto {
  data: IPost;
  search: GetPostsDto;
}

export interface UpdatePostDto {
  data: IPost;
  id: string;
  search: GetPostsDto;
}

export interface DeletePostsDto {
  ids: Array<string>;
  search: GetPostsDto;
}
