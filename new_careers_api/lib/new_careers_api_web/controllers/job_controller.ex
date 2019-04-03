defmodule NewCareersApiWeb.JobController do
  use NewCareersApiWeb, :controller

  alias NewCareersApi.Jobs
  alias NewCareersApi.Jobs.Job
  alias NewCareersApi.Apps

  action_fallback NewCareersApiWeb.FallbackController

  def index(conn, _params) do
    jobs =
      Jobs.list_jobs()
      |> Enum.filter(&authorize(conn, :show, &1))
    render(conn, "index.json", jobs: jobs)
  end

  def create(conn, %{"job" => job_params}) do
    with :ok <- authorize!(conn, :create, %Job{}, job_params) do
      with {:ok, %Job{} = job} <- Jobs.create_job(job_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.job_path(conn, :show, job))
        |> render("show.json", job: job)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)
    with :ok <- authorize!(conn, :show, job) do
      render(conn, "show.json", job: job)
    end
  end

  def update(conn, %{"id" => id, "job" => job_params}) do
    job = Jobs.get_job!(id)
    with :ok <- authorize!(conn, :update, job, job_params) do
      with {:ok, %Job{} = job} <- Jobs.update_job(job, job_params) do
        render(conn, "show.json", job: job)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)
    with :ok <- authorize!(conn, :delete, job) do
      with {:ok, %Job{}} <- Jobs.delete_job(job) do
        send_resp(conn, :no_content, "")
      end
    end
  end

  def apply(conn, %{"job_id" => job_id}) do
    app_params = %{user_id: conn.assigns.user.id, job_id: job_id}
    with {:ok, app} <- Apps.create_app(app_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.app_path(conn, :show, app))
      |> put_view(NewCareersApiWeb.AppView)
      |> render("show.json", app: app)
    end
  end

  def search(conn, %{"q" => query, "ob" => order_by, "dir" => order_dir}),
      do: search_helper(conn, query, order_by, order_dir)
  def search(conn, %{"q" => query, "ob" => order_by}),
      do: search_helper(conn, query, order_by)
  def search(conn, %{"q" => query}),
      do: search_helper(conn, query)

  defp search_helper(conn, query, order_by \\ "title", order_dir \\ "desc") do
    jobs = Jobs.search_jobs(query, order_by, order_dir)
    render(conn, "index.json", jobs: jobs)
  end
end
