# NewCareers Project Report

## Meta
Our Team: Paul "Graham" Wren, Jonathan Tseng

App Deployed Here:
[NewCareers](https://newcareers.cs4550.maineisland.co)

Github Repository: https://github.com/grahamwren/new_careers

The app is deployed and working

Team Responsibilities:
- Graham: Backend, API, Chat
- Jonathan: Front End, Client, Design

## App

### Project Goal
Our website, NewCareers, is a careers board which allows it's users
to post jobs for other users of the service. Each user is able to see
all of the jobs available and search for jobs which match their
skills. Users can then apply to these jobs and then their
applications are viewable by the user who posted the job in the first
place. The job posting owner can then review each user's profile and
chat with that user to learn more about them. They can then move the
user's application into the interview stage and schedule an interview
through the chat. Once they are satisfied with a candidate they can
move that candidates application to "hired" and all other users'
applications are "rejected," notifying them that they did not get
the position.

### User Interaction
Users can interact with our service in two ways. However, a user
who does one of these things is not prevented from doing the other.

#### The Job Seeker
The primary use case for our service is for looking for a job.
Our site hosts job postings and allows our users to apply to any
given posting, be reviewed by the hiring user, communicate with the
hiring user to schedule an interview, track the status of their
application, and finally be hired.

#### The Job Poster
Alternatively, users can join our service to post a position they are
looking to fill. They are able to describe the position so that our
search algorithm picks up key terms. Their posting is seen by other
users, who apply to it, and then the hiring user can review
these postings to find a good candidate.

### Project Requirements
Elixir: Our backend API is written in Elixir, our front end is a
React SPA.

Significant Server-side logic:
Our service supports a complex real-time chat system with WebSockets.
Allows search in job postings. Tracks and ensure consistency of
application state.

Our application is deployed to Graham's Lightsail VPS.

Even static assets (which should come from S3 over a CDN) are hosted
on cs4550.maineisland.co, Graham's VPS. We use Nginx path routing to
direct traffic to the static assets or the API to avoid CORS
configuration. (Which we had to do anyway for local development,
but whatever.)

The application supports secure user auth in Postgres via the Argon2
hashing algorithm and a Let's Encrypt certificate installed with
certbot.

The application communicates with the Google Maps API to generate a
Google Maps Place from the user's generic location string, then
returns a Google Maps URL to the user to be able to find this
location. Google Maps Platform requires API_KEY authentication.

API requests are made from the server-side in the Maps context.
Code linked: [here](https://bit.ly/2FVZgXL).

Phoenix channels and push updates are used for real-time chat.
Updates are pushed to users when the other user sends a message.

### Interesting Stuff outside Requirements
In order to let our users filter for jobs, we had to implement a search
bar for our users to search for jobs they want. Search strings 
from the user needed to be sanitized. Then we ensured that only 
100 records could be fetched at once to prevent a user scanning 
the entire table. This then required that we support custom limits 
and offset in our search API.

### Complex Aspects
The most complex part of our app was real-time chat. In order to
prevent data de-normalization. Chats are stored as messages from one
user to another. This means that a chat between users A and B is
represented by all messages which have been between the two. This
means that in order to provide a virtual chat "object" to the user,
we aggregate these messages and then extract meta-data, especially an
encoded ID from them. This is then used to create "room"(s) which
represent one of these chat objects.

### Most Significant Challenge
This most significant challenge was designing a UI which implemented
all of the features we had built into our API. Then extending the
client to support direct messages between users, along with the
pop-up chat component which fetches a list of an existing user's
chats in the lobby and then allows the user to join one of these
chats.
