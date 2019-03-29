defmodule NewCareersApiWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use NewCareersApiWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(NewCareersApiWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, "invalid user-identifier"}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render("401.json")
  end

  def call(conn, {:error, "invalid password"}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render("401.json")
  end

  def call(conn, {:error, "Unauthorized to access resource"}) do
    conn
    |> put_status(:forbidden)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render("403.json")
  end

  def call(conn, {:error, msg}) do
    IO.puts("Missing error clause\n\n\n\"" <> msg <> "\"\n\n\n")
    conn
    |> put_status(:internal_server_error)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render("500.json")
  end

  def call(conn, error) do
    IO.puts("Unknown fallback:\n\n\n")
    IO.inspect(error)
    IO.puts("\n\n\n")
    conn
    |> put_status(:internal_server_error)
    |> put_view(NewCareersApiWeb.ErrorView)
    |> render("500.json")
  end
end
