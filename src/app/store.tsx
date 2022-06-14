import AuthStore from "features/auth/store";
import SpotifyStore from "features/spotify/store";
import { createContext, useContext } from "react";

export interface RootStore {
  spotify?: SpotifyStore;
  auth?: AuthStore;
}

const rootStore: any = {};

rootStore.auth = new AuthStore(rootStore);
rootStore.spotify = new SpotifyStore(rootStore);

// export const rootStore: RootStore = {
//   spotify: new SpotifyStore(),
//   auth: new AuthStore(),
// };

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
