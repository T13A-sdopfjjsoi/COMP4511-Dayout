import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const USERS_STORE_KEY = "@users";
const EVENTS_STORE_KEY = "@events";
const ACTIVE_USER_KEY = "@active";
const GROUPS_STORE_KEY = "@groups";

export default {
  // Gets user with a certain username
  async assignActive(email) {
    try {
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY);
      const storedUsers = asyncUsers ? JSON.parse(asyncUsers) : [];
      const index = storedUsers.findIndex((user) => user.email === email);

      if (index === -1) {
        return null;
      }

      await AsyncStorage.setItem(
        ACTIVE_USER_KEY,
        JSON.stringify(storedUsers[index])
      );

      return storedUsers[index];
    } catch (error) {
      console.log("Failed to assign user", error);
    }
  },

  async getActive() {
    try {
      const asyncUser = await AsyncStorage.getItem(ACTIVE_USER_KEY);
      const storedUser = asyncUser ? JSON.parse(asyncUser) : {};

      return storedUser;
    } catch (error) {
      console.log("Failed to get active user", error);
    }
  },

  async removeActive() {
    try {
      await AsyncStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({}));
    } catch (error) {
      console.log("Failed to remove active user", error);
    }
  },

  async getUser(email) {
    try {
      console.log("getting user");
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY);
      const storedUsers = asyncUsers ? JSON.parse(asyncUsers) : [];
      console.log(storedUsers);
      console.log(email);
      const index = storedUsers.findIndex((user) => user.email === email);

      if (index === -1) {
        console.log("Can't find user");
        return null;
      }

      return storedUsers[index];
    } catch (error) {
      console.log("Failed to get user", error);
    }
  },

  // Updates user with a given username
  async updateUser(username, user) {
    try {
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY);
      const storedUsers = asyncUsers ? JSON.parse(asyncUsers) : [];
      const index = storedUsers.findIndex((user) => user.username === username);
      console.log("All users", storedUsers);
      console.log("user to update", username, user);
      console.log("index", index);
      if (index === -1) {
        return false;
      }
      console.log("update user", user);
      storedUsers[index] = user;
      await AsyncStorage.setItem(USERS_STORE_KEY, JSON.stringify(storedUsers));
      return true;
    } catch (error) {
      console.log("Failed to update user", error);
    }
  },

  // Adds User, checks whether username is unique
  async addUser(user) {
    try {
      console.log("New user", user);
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY);
      const storedUsers = asyncUsers ? JSON.parse(asyncUsers) : [];
      const username = user.username;
      const index = storedUsers.findIndex((user) => user.username === username);
      console.log("All users", storedUsers);
      console.log("index", index);
      if (index > 0) {
        // Username already taken
        return false;
      }

      storedUsers.push(user);
      console.log("New users", storedUsers);
      await AsyncStorage.setItem(USERS_STORE_KEY, JSON.stringify(storedUsers));
      return true;
    } catch (error) {
      console.log("Failed to add user", error);
    }
  },

  // Gets event by id
  async getEvent(id) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      const storedEvents = asyncEvents ? JSON.parse(asyncEvents) : [];
      const index = storedEvents.findIndex((event) => event.id === id);

      if (index === -1) {
        return null;
      }

      return storedEvents[index];
    } catch (error) {
      console.log("Failed to get event", error);
    }
  },

  // Updates event with id
  async updateEvent(id, event) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      const storedEvents = asyncEvents ? JSON.parse(asyncEvents) : [];
      const index = storedEvents.findIndex((event) => event.id === id);

      if (index === -1) {
        return null;
      }

      storedEvents[index] = event;
      await AsyncStorage.setItem(
        EVENTS_STORE_KEY,
        JSON.stringify(storedEvents)
      );
    } catch (error) {
      console.log("Failed to update event", error);
    }
  },

  // Adds event and returns id
  async addEvent(event) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      const storedEvents = asyncEvents ? JSON.parse(asyncEvents) : [];
      const eventId = uuidv4();
      event.id = eventId;

      storedEvents.push(event);

      await AsyncStorage.setItem(
        EVENTS_STORE_KEY,
        JSON.stringify(storedEvents)
      );
      return eventId;
    } catch (error) {
      console.log("Failed to add event", error);
    }
  },

  // Returns events created by user
  async getUsersEvents(username) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY);
      const storedEvents = asyncEvents ? JSON.parse(asyncEvents) : [];

      const userEvents = storedEvents.filter(
        (event) => event.creator === username
      );
      return userEvents;
    } catch (error) {
      console.log("Failed to find user's events", error);
    }
  },

  // Add a group
  async addGroup(group) {
    try {
      const asyncgroups = await AsyncStorage.getItem(GROUPS_STORE_KEY);
      const storedgroups = asyncgroups ? JSON.parse(asyncgroups) : [];
      const groupId = uuidv4();
      group.id = groupId;

      storedgroups.push(group);
      await AsyncStorage.setItem(
        GROUPS_STORE_KEY,
        JSON.stringify(storedgroups)
      );
      return groupId;
    } catch (error) {
      console.log("Failed to add group", error);
    }
  },

  // get group detail
  async getGroup(id) {
    try {
      const asyncgroups = await AsyncStorage.getItem(GROUPS_STORE_KEY);
      const storedgroups = asyncgroups ? JSON.parse(asyncgroups) : [];
      const index = storedgroups.findIndex((group) => group.id === id);

      if (index === -1) {
        return null;
      }

      return storedgroups[index];
    } catch (error) {
      console.log("Failed to get group", error);
    }
  },

  // get all groups detail
  async getAllGroups() {
    try {
      const asyncgroups = await AsyncStorage.getItem(GROUPS_STORE_KEY);
      const storedgroups = asyncgroups ? JSON.parse(asyncgroups) : [];
      return storedgroups;
    } catch (error) {
      console.log("Failed to get groups", error);
    }
  },

  // update group detail
  async updateGroup(id, group) {
    try {
      const asyncgroups = await AsyncStorage.getItem(GROUPS_STORE_KEY);
      const storedgroups = asyncgroups ? JSON.parse(asyncgroups) : [];
      const index = storedgroups.findIndex((group) => group.id === id);

      if (index === -1) {
        return null;
      }

      storedgroups[index] = group;
      await AsyncStorage.setItem(
        GROUPS_STORE_KEY,
        JSON.stringify(storedgroups)
      );
    } catch (error) {
      console.log("Failed to update group", error);
    }
  },

  // remove all groups
  async removeAllGroups() {
    try {
      await AsyncStorage.setItem(GROUPS_STORE_KEY, JSON.stringify([]));
    } catch (error) {
      console.log("Failed to remove groups", error);
    }
  },
};
