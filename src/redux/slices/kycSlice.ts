import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface KycState {
  submissions: Array<{
    id: string;
    userId: string;
    documentUrl: string;
    status: "Pending" | "Approved" | "Rejected";
  }>;
  stats: {
    totalUsers: number;
    approved: number;
    rejected: number;
    pending: number;
  };
}

const initialState: KycState = {
  submissions: [],
  stats: { totalUsers: 0, approved: 0, rejected: 0, pending: 0 },
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setSubmissions(state, action: PayloadAction<KycState["submissions"]>) {
      state.submissions = action.payload;
    },
    setStats(state, action: PayloadAction<KycState["stats"]>) {
      state.stats = action.payload;
    },
  },
});

export const { setSubmissions, setStats } = kycSlice.actions;
export default kycSlice.reducer;
