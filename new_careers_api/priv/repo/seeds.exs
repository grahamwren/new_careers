# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     NewCareersApi.Repo.insert!(%NewCareersApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias NewCareersApi.Repo
alias NewCareersApi.Users.User
alias NewCareersApi.Jobs.Job
alias NewCareersApi.Apps.App
alias NewCareersApi.Chats.Message

%{password_hash: password_hash} = Argon2.add_hash("password")

g = Repo.insert!(%User{
  name: "Graham",
  email: "graham@mic.com",
  password_hash: password_hash
})

alex = Repo.insert!(%User{
  name: "Alex",
  email: "alex@mic.com",
  password_hash: password_hash
})

blake = Repo.insert!(%User{
  name: "Blake",
  email: "blake@mic.com",
  password_hash: password_hash
})

job1 = Repo.insert!(%Job{
  title: "Software Engineer",
  description: "Talented software engineer!",
  company: "Software.com",
  location: "New York, NY",
  salary: 50,
  salary_type: 0,
  contact_id: g.id
})


job2 = Repo.insert!(%Job{
  title: "Software Manager",
  description: "Talented software manager!",
  company: "Software.com",
  location: "New York, NY",
  salary: 3000,
  salary_type: 1,
  contact_id: g.id
})

_app1 = Repo.insert!(%App{
  user_id: alex.id,
  job_id: job1.id
})

_app2 = Repo.insert!(%App{
  user_id: alex.id,
  job_id: job2.id
})

_app3 = Repo.insert!(%App{
  user_id: blake.id,
  job_id: job1.id
})

Repo.insert(%Message{
  from_id: alex.id,
  to_id: blake.id,
  message: "Hello Blake!"
})

Repo.insert(%Message{
  from_id: blake.id,
  to_id: alex.id,
  message: "Hello Alex!"
})
