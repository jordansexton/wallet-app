import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cluster } from '@solana/web3.js'

export type AppState = {
  showCollectablesTabBar: boolean
  showConnectedWallets: boolean
  showBanner: boolean
  cluster?: Cluster
}

const initialState: AppState = {
  showCollectablesTabBar: true,
  showConnectedWallets: false,
  showBanner: true,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCluster: (state, action: PayloadAction<Cluster>) => {
      state.cluster = action.payload
    },
    setCollectablesTabBar: (state, action: PayloadAction<boolean>) => {
      state.showCollectablesTabBar = action.payload
    },
    toggleConnectedWallets: (state) => {
      state.showConnectedWallets = !state.showConnectedWallets
    },
    setShowBanner: (state, action: PayloadAction<boolean>) => {
      state.showBanner = action.payload
    },
  },
})

const { reducer, name } = appSlice
export { name, appSlice }
export default reducer
