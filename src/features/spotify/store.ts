import { makeAutoObservable, runInAction } from "mobx";
import { API_URL } from "./config";
import { RootStore } from "app/store";

// @TODO this will probably need a server for push updates

export default class SpotifyStore {
  rootStore: any;
  deviceId: string = undefined;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async getPlaybackState() {
    const response = await this.query("me/player");
    try {
      this.deviceId = response.device.id;
    } catch (err) {}
    console.log("result", response);
  }

  async pause() {
    await this.query("me/player/pause", "PUT");
  }

  async play() {
    await this.query("me/player/play", "PUT");
  }

  async query(path: string, method = "GET", body: any = undefined) {
    const response = await fetch(`${API_URL}/${path}`, {
      method: method,
      body: body,
      headers: new Headers({
        Authorization: `Bearer ${this.rootStore.auth.accessToken}`,
        "Content-Type": "application/json",
      }),
    });
    try {
      const json = await response.json();
      console.log("query response", json);
      return json;
    } catch (err) {
      console.log("Error parsing response:", err);
    }
  }
}
