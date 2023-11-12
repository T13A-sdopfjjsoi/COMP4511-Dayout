import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid';

const USERS_STORE_KEY = "@users";
const EVENTS_STORE_KEY = "@events";
const GROUPS_STORE_KEY = "@groups";

export default {
  // Gets user with a certain username
  async getUser(username) {
    try {
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY)
      const storedUsers = (asyncUsers) ? JSON.parse(asyncUsers) : [];
      const index = storedUsers.findIndex((user) => user.username === username)
      
      if (index === -1 ){
        return null
      }

      return storedUsers[index];

    } catch (error) {
      console.log("Failed to get user", error);
    }
  },
  
  // Updates user with a given username
  async updateUser(username, user) {
    try {
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY)
      const storedUsers = (asyncUsers) ? JSON.parse(asyncUsers) : [];
      const index = storedUsers.findIndex((user) => user.username === username)
      
      if (index === -1 ){
        return null
      }

      storedUsers[index] = user
      await AsyncStorage.setItem(USERS_STORE_KEY,JSON.stringify(storedUsers));
    } catch (error) {
      console.log("Failed to update user", error);
    }
  },

  // Adds User, checks whether username is unique
  async addUser(user) {
    try {
      const asyncUsers = await AsyncStorage.getItem(USERS_STORE_KEY)
      const storedUsers = (asyncUsers) ? JSON.parse(asyncUsers) : [];
      const username = user.username
      const index = storedUsers.findIndex((user) => user.username === username)
      
      if (index !== -1 ){
        // Username already taken
        return null
      }

      storedUsers.push(user)
      await AsyncStorage.setItem(USERS_STORE_KEY,JSON.stringify(storedUsers));
    } catch (error) {
      console.log("Failed to add user", error);
    }
  },

  // Gets event by id
  async getEvent(id) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY)
      const storedEvents = (asyncEvents) ? JSON.parse(asyncEvents) : [];
      const index = storedEvents.findIndex((event) => event.id === id)
      
      if (index === -1 ){
        return null
      }

      return storedEvents[index];

    } catch (error) {
      console.log("Failed to get event", error);
    }
  },
  
  // Updates event with id
  async updateEvent(id, event) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY)
      const storedEvents = (asyncEvents) ? JSON.parse(asyncEvents) : [];
      const index = storedEvents.findIndex((event) => event.id === id)
      
      if (index === -1 ){
        return null
      }

      storedEvents[index] = event
      await AsyncStorage.setItem(EVENTS_STORE_KEY,JSON.stringify(storedEvents));
    } catch (error) {
      console.log("Failed to update event", error);
    }
  },

  // Adds event and returns id
  async addEvent(event) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY)
      const storedEvents = (asyncEvents) ? JSON.parse(asyncEvents) : [];
      const eventId = uuidv4();
      event.id = eventId;
      
      storedEvents.push(event)

      await AsyncStorage.setItem(EVENTS_STORE_KEY,JSON.stringify(storedEvents));
      return eventId
    } catch (error) {
      console.log("Failed to add event", error);
    }
  },

  // Returns events created by user
  async getUsersEvents(username) {
    try {
      const asyncEvents = await AsyncStorage.getItem(EVENTS_STORE_KEY)
      const storedEvents = (asyncEvents) ? JSON.parse(asyncEvents) : [];

      const userEvents = storedEvents.filter((event) => event.creator === username);
      return userEvents;

    } catch (error) {
      console.log("Failed to find user's events", error);
    }
  },
}