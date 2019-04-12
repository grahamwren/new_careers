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
      upload: "/api/v1" <> Upload.url({file.upload, file})}
  end
end
