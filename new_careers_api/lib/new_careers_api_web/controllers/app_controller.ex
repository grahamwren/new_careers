defmodule NewCareersApiWeb.AppController do
  use NewCareersApiWeb, :controller

  alias NewCareersApi.Apps
  alias NewCareersApi.Apps.App
  alias NewCareersApi.Jobs
  alias NewCareersApi.Jobs.Job

  action_fallback NewCareersApiWeb.FallbackController

  def index(conn, %{"user_id" => user_id}) do
    apps =
      Apps.list_apps_for_user(user_id)
      |> Enum.filter(&authorize(conn, :show, &1))

    render(conn, "index.json", apps: apps)
  end

  def index(conn, %{"job_id" => job_id}) do
    with %Job{} = job = Jobs.get_job!(job_id) do
      with :ok <- authorize!(conn, :update, job) do
        apps =
          Apps.list_apps_for_job(job)
          |> Enum.filter(&authorize(conn, :show, &1))
        render(conn, "index.json", apps: apps)
      end
    end
  end

  def index(conn, _params) do
    apps =
      Apps.list_apps()
      |> Enum.filter(&authorize(conn, :show, &1))
    render(conn, "index.json", apps: apps)
  end

  def create(conn, %{"app" => app_params}) do
    with {:ok, %App{} = app} <- Apps.create_app(app_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.app_path(conn, :show, app))
      |> render("show.json", app: app)
    end
  end

  def show(conn, %{"id" => id}) do
    app = Apps.get_app!(id)
    render(conn, "show.json", app: app)
  end

  def update(conn, %{"id" => id, "app" => app_params}) do
    app = Apps.get_app!(id)
    with :ok <- authorize!(conn, :update, app, app_params) do
      with {:ok, %App{} = app} <- Apps.update_app(app, app_params) do
        render(conn, "show.json", app: app)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    app = Apps.get_app!(id)

    with {:ok, %App{}} <- Apps.delete_app(app) do
      send_resp(conn, :no_content, "")
    end
  end
end
