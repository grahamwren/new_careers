defmodule NewCareersApi.Repo.Migrations.CreateApps do
  use Ecto.Migration

  def change do
    create table(:apps) do
      add :status, :integer, default: 0, null: false
      add :user_id, references(:users, on_delete: :delete_all)
      add :job_id, references(:jobs, on_delete: :delete_all)

      timestamps()
    end

    create index(:apps, [:user_id])
    create index(:apps, [:job_id])
    create unique_index(:apps, [:user_id, :job_id], name: :one_app_per_user_per_job)
  end
end
