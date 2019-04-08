defmodule NewCareersApi.AuthorizationHelpers do
  alias NewCareersApi.Repo
  alias NewCareersApi.Jobs.Job
  alias NewCareersApi.Users.User
  alias NewCareersApi.Apps.App

  def authorize(conn, action, resource, params \\ %{}),
      do: authorize_helper(conn, action, resource, params)
  def authorize!(conn, action, resource, params \\ %{}),
      do: if authorize(conn, action, resource, params),
          do: :ok,
          else: {:error, "Unauthorized to access resource"}

  # Jobs ============================================================
  defp authorize_helper(_conn, :show, %Job{} = _job, _params), do: true
  defp authorize_helper(conn, :create, %Job{} = _job, params),
       do: match_user_id(conn, IO.inspect(params["contact_id"]))
  defp authorize_helper(conn, :update, %Job{} = job, params),
       do: match_user_id(conn, job.contact_id) &&
           (!params["contact_id"] ||
            match_user_id(conn, params["contact_id"]))
  defp authorize_helper(conn, :delete, %Job{} = job, _params),
       do: match_user_id(conn, job.contact_id)

  # Users ===========================================================
  defp authorize_helper(_conn, :create, %User{}, _params), do: true
  defp authorize_helper(_conn, :show, %User{}, _params), do: true
  defp authorize_helper(conn, _action, %User{} = user, _params),
       do: match_user_id(conn, user)

  # Apps ============================================================
  #   create - allowed if creating for self
  defp authorize_helper(conn, :create, %App{}, params),
       do: match_user_id(conn, params["user_id"])
  #   show - allowed for user who owns app or user who owns job
  defp authorize_helper(conn, :show, %App{} = app, _params) do
    match_user_id(conn, app.user_id) ||
    match_user_id(conn, Repo.preload(app, :job).job.contact_id)
  end
  #   update - allowed for job owner to update status, no update of job_id or user_id
  defp authorize_helper(conn, :update, %App{} = app, params) do
    !params["user_id"] &&
    !params["job_id"] &&
    match_user_id(conn, Repo.preload(app, :job).job.contact_id)
  end
  #   delete - allowed for user who posted app
  defp authorize_helper(conn, :delete, %App{user_id: user_id}, _params),
       do: match_user_id(conn, user_id)

  # Default to block
  defp authorize_helper(_conn, _action, _resource, _params), do: false

  defp match_user_id(conn, %User{id: user_id}),
       do: match_user_id(conn, user_id)
  defp match_user_id(conn, user_id) when is_integer(user_id) do
    conn &&
      conn.assigns &&
      conn.assigns.user &&
      conn.assigns.user.id === user_id
  end
  defp match_user_id(conn, user_id) do
    {user_id, _} = Integer.parse(user_id)
    match_user_id(conn, user_id)
  end
end

# method(Object o) {
#  string = isString?(o) ? o : o.toString();
#  return string_stuff...;
#}