defmodule NewCareersApiWeb.Router do
  use NewCareersApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :with_auth do
    plug NewCareersApiWeb.Plugs.AuthenticateUser
  end

  # CORS stuff
  options "/*_any", CORSPlug, [origin: "http://localhost:3000"]

  scope "/api/v1", NewCareersApiWeb do
    pipe_through :api

    post "/login", SessionController, :create, singleton: true
    resources "/users", UserController, only: [:create]

    pipe_through :with_auth
    resources "/users", UserController, except: [:new, :create, :edit]
    resources "/jobs", JobController, except: [:new, :edit]
  end
end
