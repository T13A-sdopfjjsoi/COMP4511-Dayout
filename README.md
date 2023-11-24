# DayOut - Event Application

## Setup

Clone the repository and run `npm install`. This will install every library we used in this project.

Then run `npx expo start` to start expo and choose the device whether Android `a` or IOS `i`.

## Components

Here is list of components in this project and the progress.

| Component      | Description                                                              | Finished? | Issue                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication | Login/Signup                                                             | YES       | The external signup/login method was removed as an external API library is needed and requires an account to configure. So we can't test every method and only email signup was implemented. |
| Home           | Hub of the application, users can find events here.                      | Partial   |
| Search         | Show list of events available and filter events.                         | YES       |
| For you        | Recommend events to users based on their interests.                      | Partial   | Swiping feature was not implemented                                                                                                                                                          |
| Social         | Includes Groups and friends to allow users to to be part of a community. | Partial   | Recommendation not implement                                                                                                                                                                 |
| Profile        | User profile and create event.                                           | YES       |                                                                                                                                                                                              |
| Event          | View event details                                                       | YES       |                                                                                                                                                                                              |
| EventCreate    | Create an event                                                          | YES       | For setting the event time, enter `1300` for 1pm etc                                                                                                                                         |
| Group          | View group calendar and members                                          | YES       | The goal for the calendar is to allow members to add activities/events and see if there is any conflict between member time schedules.                                                       |
| GroupCreate    | Create a group                                                           | YES       |                                                                                                                                                                                              |
