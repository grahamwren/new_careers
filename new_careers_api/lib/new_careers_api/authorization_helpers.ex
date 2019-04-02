defmodule NewCareersApi.AuthorizationHelpers do
  alias NewCareersApi.Jobs.Job
  alias NewCareersApi.Users.User

  def authorize(conn, action, resource, params \\ %{}),
      do: authorize_helper(conn, action, resource, params)
  def authorize!(conn, action, resource, params \\ %{}),
      do: if authorize(conn, action, resource, params),
          do: :ok,
          else: {:error, "Unauthorized to access resource"}

  # Jobs ============================================================
  defp authorize_helper(_conn, :show, %Job{} = _job, _params), do: true
  defp authorize_helper(conn, :create, %Job{} = _job, params),
       do: match_user_id(conn, params["contact_id"])
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

  # Default to block
  defp authorize_helper(_conn, _action, _resource, _params), do: false

  defp match_user_id(conn, %User{id: user_id}),
       do: match_user_id(conn, user_id)
  defp match_user_id(conn, user_id),
       do: conn &&
         conn.assigns &&
         conn.assigns.user &&
         conn.assigns.user.id === user_id
end

# method(Object o) {
#  string = isString?(o) ? o : o.toString();
#  return string_stuff...;
#}