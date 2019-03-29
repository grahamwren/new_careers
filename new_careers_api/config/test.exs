use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :new_careers_api, NewCareersApiWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :new_careers_api, NewCareersApi.Repo,
  username: "postgres",
  password: "postgres",
  database: "new_careers_api_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
