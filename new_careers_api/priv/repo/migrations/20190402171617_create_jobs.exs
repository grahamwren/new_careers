defmodule NewCareersApi.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :title, :text, null: false
      add :description, :text, null: false
      add :company, :text, null: false
      add :location, :text, null: false
      add :salary, :integer
      add :salary_type, :integer, null: false
      add :contact_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:jobs, [:contact_id])
  end
end
