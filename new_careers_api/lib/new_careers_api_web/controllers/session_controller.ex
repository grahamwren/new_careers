defmodule NewCareersApiWeb.SessionController do
  use NewCareersApiWeb, :controller

  alias NewCareersApi.Users
  alias NewCareersApi.Users.User

  action_fallback NewCareersApiWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Users.get_and_auth_user(email, password) do
      resp = %{data: %{
        user_id: user.id,
        token: Phoenix.Token.sign(NewCareersApiWeb.Endpoint, "user_id", user.id)
      }}

      conn
      |> put_resp_header("content-type", "application/json")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end