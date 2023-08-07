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

  async play(deviceId?: string, uri?: string) {
    // deviceId = "f5065be3610e09c8467b9f895426e4e7735ef675";
    uri = "spotify:track:6CRrgsbwjYscoqZ9ja118u";
    // if (deviceId) {
    const result = await this.query(`me/player/play`, "PUT", {
      uris: [uri],
    });
    console.log(result);
    // } else return await this.query("me/player/play", "PUT");
  }

  async setDevice() {
    return await this.query("me/player", "PUT", {
      play: true,
      device_ids: ["f5065be3610e09c8467b9f895426e4e7735ef675"],
    });
  }

  async getDevices() {
    const devices = await this.query("me/player/devices");
    console.log("devices:", devices);
  }

  async query(path: string, method = "GET", body: any = undefined) {
    console.log("path:", path, body);
    const response = await fetch(`${API_URL}/${path}`, {
      method: method,
      body: JSON.stringify(body),
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
      console.log("Error parsing response:", err, JSON.stringify(response));
    }
  }
}
