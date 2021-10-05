# Habit Tribes - Social habit tracking community
Habit Tribes is a light weight, web based habit tracking application and social network. Set goals of creating new habits, or quiting old habits. Create sequential reminders with your self recorded motivation when you create your new goals. Share your goals with a community and your friends. Record and send messages to your tribe supporting them and holding them accountable to their goals.


# Screenshots


# Installing
#### npm i - installs dependencies
#### npm dev - starts server in dev mode

# Features

# Technology used
React  
Express  
PostgreSQL  
Node  
Chakra UI  


# Contributing

Habit tribes is an open source project. Please feel free to contribute by reporting any bugs, suggesting, features, or even writing your own component. We look forward to your reviewing your feedback.

# Styling

## Fonts
Logo - Mont Bold

## Colors

Blue - #41a1d9  
White - #000  
Dark grey - #242f37  


# License




NOTES FOR FINISHED&UNFINISHED SERVER ROUTES:

SERVER ROUTES THAT READ FROM DB: 

from habit dashboard:

in GET /habit (immediately upon visiting page):
(stretch): retrieve profile picture from DB filesystem
retrieve ‘today’ value from ‘today’ table
retrieve list of habit names & completed_today values from user_habits_join corresponding to current users_id, that have a users_habits_join_id in the user_habit_calendar on the current day (How this query works: first find all entries in user_habit_calendar where days_since_launch = today. Also find all users_habits_join entries with users_id of current user. Then filter the list from user_habit_calendar further to only include entries with users_habits_join_id’s that occur on the list from users_habits_join. )
for each entry in the table returned, compare its days_missed value with its days_missed_until_reminder value. if they equal each other, redirect to GET /video

in GET /video: 
selectVideo controller: retrieve list of all video filenames recorded for current user. return first video filename (priority to videos with watched value set to false)
streamVideo controller: return stream of data from file at specified filename in path. 
set selected video’s ‘watched’ val to true in DB




from friends list page (stretch)
retrieve list of friends corresponding to current user
retrieve stats about friends (number of habits, avg % completed, # of motivational videos, etc)


from stats calendar modal (stretch):
GET /stats: retrieve list of user’s habits


from friend’s profile page (stretch):
GET /friends/:id retrieve list of habits corresponding to specified user id
POST /friends/:id invoke controller to save new video to db, passing in specified friend id for recorded_for_id


from settings modal (stretch):



Server routes that write to DB: 

when a new user signs up:
- create a new entry in users with input data from client (darkmode_setting defaults to true, timezone defaults to the time the user signed up, including their time zone (derived from the Date object)

when a user deletes their account (this may be tricky):
- delete every entry in every table that refers to the user’s id, or any of their user_habits_join ids
- delete every entry in friends with reference to user’s id
- delete every entry in videos with reference to user’s id
    - also (FIRST) delete video from file system


at the end of each user’s day:
- for every entry in user_habits_join with a user id (email) corresponding to current user, reset completed_today to false

when a user creates a new goal:
- if the habit exists, get the habit_id. otherwise, create a new entry in habits table & return id.
- create new entry in user_habits_join, populating it with input data from the client & user id (email) corresponding to current user
- populate user_habit_calendar with a new entry for every day value (habitStartDay + habit_frequency * i) where i < 10,000

when a user marks a goal as done:
- set completed_today in user_habit_calendar table entry to true
when a user UNmarks a goal as done (same path as above):
- set completed_today in user_habit_calendar table entry to false

when a user makes a friend request:
- get user id (email) corresponding to input from client. if none is found, return error message
- create new entry in friends table 
    - request_accepted defaults to false
    - set friend_a value to current user id (email)
    - set friend_b value to friend’s user id (email)

when a user accepts a friend request:
- set request_accepted of entry in friends table to true

when a user deletes a friend:
- not sure yet: either delete entry from friend table (will require error handling in cases when a video from an ex-friend is triggered), or just set request_accepted val to false

when a user changes their darkmode settings:
- update darkmode_setting value in users table entry with data from client
when a user changes their push notifications settings:
- update push_notifications_setting value in users_habits_join table entry with data from client
when a user changes their text notifications settings:
- update text_notifications_setting value in users_habits_join table entry with data from client
when a user changes their email address:
- update email value in users table entry with data from client
when a user changes their phone number settings:
- update phone_number value in users table entry with data from client
when a user changes their name settings:
- update name value in users table entry with data from client


when a user records a new video for themself: 
- save video to database’s hard disk in the directory where we save videos. use a unique filename (perhaps derived from current date&time combined with user id?)
- create a new entry in videos with data from client
    - send_when defaults to ‘slacking’ (in which case it will send the video when the users_habits_join entry’s days_missed === their days_missed_until_reminder). send_when can also be set to ‘benchmark_reached’, in which case it will send when total_days === benchmark
when a user records a new video for a friend (same path as above. only difference is recorded_for_id !== current user id):
- save video to database’s hard disk in the directory where we save videos. use a unique filename (perhaps derived from current date&time combined with user id?)
- create a new entry in videos with data from client. set recorded_for_id to the target friend’s user id (email).
    - send_when defaults to ‘slacking’ (in which case it will send the video when the users_habits_join entry’s days_missed === their days_missed_until_reminder). send_when can also be set to ‘benchmark_reached’, in which case it will send when total_days === benchmark


MORE CONTROLLERS THAT WRITE TO DB:

* increment ‘today’ constant by 1 at the end of each day 
* after a video is viewed, mark its ‘watched’ value as true in DB
* when a task is marked as completed_today, also reset its days_missed value to 0, and increment its days_since_missed and total_days_achieved (this isn’t perfect; what happens if a user toggles the button more than once in a day?)


GET /settings: retrieve current user’s settings
