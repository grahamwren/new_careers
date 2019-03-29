# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :new_careers_api,
  ecto_repos: [NewCareersApi.Repo]

# Configures the endpoint
config :new_careers_api, NewCareersApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+CuIL+udCkvDAX4gCnUX6LJUL4vFbrz2W3OgQkNsH5KI5uUYCtch9txpdpGUXwT1",
  render_errors: [view: NewCareersApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: NewCareersApi.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
