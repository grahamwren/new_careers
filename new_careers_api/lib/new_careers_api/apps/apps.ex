defmodule NewCareersApi.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias NewCareersApi.Repo

  alias NewCareersApi.Users.User
  alias NewCareersApi.Jobs.Job
  alias NewCareersApi.Apps.App

  @doc """
  Returns the list of apps.

  ## Examples

      iex> list_apps()
      [%App{}, ...]

  """
  def list_apps do
    Repo.all(App)
  end

  def list_apps_for_user(%User{id: id}), do: list_apps_for_user(id)
  def list_apps_for_user(id) do
    Repo.all(from a in App, where: a.user_id == ^id)
  end

  def list_apps_for_job(%Job{id: id} = job),
      do: Repo.all(from a in App, where: a.job_id == ^id)
          |> Enum.map(fn a -> %App{a | job: job} end)
  def list_apps_for_job(id),
      do: Repo.all(from a in App, where: a.job_id == ^id)
          |> Repo.preload(:job)


  @doc """
  Gets a single app.

  Raises `Ecto.NoResultsError` if the App does not exist.

  ## Examples

      iex> get_app!(123)
      %App{}

      iex> get_app!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app!(id), do: Repo.get!(App, id)

  @doc """
  Creates a app.

  ## Examples

      iex> create_app(%{field: value})
      {:ok, %App{}}

      iex> create_app(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app(attrs \\ %{}) do
    %App{}
    |> App.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app.

  ## Examples

      iex> update_app(app, %{field: new_value})
      {:ok, %App{}}

      iex> update_app(app, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app(%App{id: app_id, job_id: job_id} = app, attrs) do
    if (attrs["status"] === "hired") do
      from(a in App, where: a.job_id == ^job_id and a.id != ^app_id)
      |> Repo.update_all(set: [status: 2])
    end
    app |> App.changeset(attrs) |> Repo.update
  end

  @doc """
  Deletes a App.

  ## Examples

      iex> delete_app(app)
      {:ok, %App{}}

      iex> delete_app(app)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app(%App{} = app) do
    Repo.delete(app)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app changes.

  ## Examples

      iex> change_app(app)
      %Ecto.Changeset{source: %App{}}

  """
  def change_app(%App{} = app) do
    App.changeset(app, %{})
  end
end
