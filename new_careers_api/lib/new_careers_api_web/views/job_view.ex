defmodule NewCareersApiWeb.JobView do
  use NewCareersApiWeb, :view
  alias NewCareersApiWeb.JobView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "job.json")}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      maps_url: job.maps_url,
      salary: job.salary,
      salary_type: job.salary_type,
      contact_id: job.contact_id}
  end
end
