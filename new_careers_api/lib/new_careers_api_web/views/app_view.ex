defmodule NewCareersApiWeb.AppView do
  use NewCareersApiWeb, :view
  alias NewCareersApiWeb.AppView

  def render("index.json", %{apps: apps}) do
    %{data: render_many(apps, AppView, "app.json")}
  end

  def render("show.json", %{app: app}) do
    %{data: render_one(app, AppView, "app.json")}
  end

  def render("app.json", %{app: app}) do
    %{id: app.id,
      status: app.status,
      user_id: app.user_id,
      job_id: app.job_id}
  end
end
