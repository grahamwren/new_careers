defmodule NewCareersApi.Repo.Migrations.AddMapsUrlToJob do
  use Ecto.Migration
  alias NewCareersApi.Jobs
  alias NewCareersApi.Jobs.Job

  def up do
    alter table(:jobs) do
      add :maps_url, :text
    end

    flush()

    Enum.each(Jobs.list_jobs, &Jobs.update_job(&1, %{}))
  end

  def down do
    alter table(:jobs) do
      remove :maps_url
    end
  end
end
