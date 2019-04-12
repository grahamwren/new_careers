defmodule NewCareersApiWeb.FileController do
  use NewCareersApiWeb, :controller

  alias NewCareersApi.Files
  alias NewCareersApi.Files.File

  action_fallback NewCareersApiWeb.FallbackController

  def index(conn, %{"user_id" => user_id}) do
    files =
      Files.list_files
      |> Enum.filter(&authorize(conn, :show, &1))
    render(conn, "index.json", files: files)
  end

  def index(conn, _params) do
    files = Files.list_files_for_user(conn.assigns.user.id)
    render(conn, "index.json", files: files)
  end

  def create(conn, %{"file_name" => file_name, "file" => file_data}) do
    %{id: user_id} = conn.assigns.user
    file = %{"name" => file_name, "upload" => file_data, "user_id" => user_id}
    with :ok <- authorize!(conn, :create, %File{}, file),
         {:ok, %File{} = file} <- Files.create_file(file) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.file_path(conn, :show, file))
      |> render("show.json", file: file)
    end
  end

  def show(conn, %{"id" => id}) do
    file = Files.get_file!(id)
    with :ok <- authorize!(conn, :show, file) do
      render(conn, "show.json", file: file)
    end
  end

  def update(conn, %{"id" => id, "file" => file_params}) do
    file = Files.get_file!(id)
    with :ok <- authorize!(conn, :update, file, file_params),
         {:ok, %File{} = file} <- Files.update_file(file, file_params) do
      render(conn, "show.json", file: file)
    end
  end

  def delete(conn, %{"id" => id}) do
    file = Files.get_file!(id)

    with :ok <- authorize!(conn, :delete, file),
         {:ok, %File{}} <- Files.delete_file(file) do
      send_resp(conn, :no_content, "")
    end
  end
end
