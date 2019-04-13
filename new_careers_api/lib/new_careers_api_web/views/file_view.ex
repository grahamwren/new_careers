defmodule NewCareersApiWeb.FileView do
  use NewCareersApiWeb, :view
  alias NewCareersApiWeb.FileView
  alias NewCareersApi.Upload

  def render("index.json", %{files: files}) do
    %{data: render_many(files, FileView, "file.json")}
  end

  def render("show.json", %{file: file}) do
    %{data: render_one(file, FileView, "file.json")}
  end

  def render("file.json", %{file: file}) do
    %{id: file.id,
      name: file.name,
      public: file.public,
      user_id: file.user_id,
      upload: get_file_url(file)}
  end

  defp get_file_url(file) do
    base_url = Upload.url({file.upload, file})
    file_store_path = Application.get_env(:new_careers_api, :file_storage_path)
    url = if file_store_path, do: String.replace(base_url, file_store_path, "/"), else: base_url
    "/api/v1" <> url
  end
end
