import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStore } from "app/store";

export default class AuthStore {
  accessToken: string = undefined;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async saveAccessToken(token: string) {
    this.accessToken = token;
    await AsyncStorage.setItem("accessToken", token);
  }

  async fetchCurrentSession() {
    const value = await AsyncStorage.getItem("accessToken");
    console.log("!2 token:", value);
    runInAction(() => {
      this.accessToken = value;
    });
  }
}
