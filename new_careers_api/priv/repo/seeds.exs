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

%{password_hash: password_hash} = Argon2.add_hash("password")

g = Repo.insert!(%User{
  name: "Graham",
  email: "graham@mic.com",
  password_hash: password_hash
})

_alex = Repo.insert!(%User{
  name: "Alex",
  email: "alex@mic.com",
  password_hash: password_hash
})

_blake = Repo.insert!(%User{
  name: "Blake",
  email: "blake@mic.com",
  password_hash: password_hash
})

_job1 = Repo.insert!(%Job{
  title: "Software Engineer",
  description: "Talented software engineer!",
  company: "Software.com",
  location: "New York, NY",
  salary: 50,
  salary_type: 0,
  contact_id: g.id
})


_job2 = Repo.insert!(%Job{
  title: "Software Manager",
  description: "Talented software manager!",
  company: "Software.com",
  location: "New York, NY",
  salary: 3000,
  salary_type: 1,
  contact_id: g.id
})
