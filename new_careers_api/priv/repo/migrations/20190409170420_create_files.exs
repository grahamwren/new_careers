defmodule NewCareersApi.Repo.Migrations.CreateFiles do
  use Ecto.Migration

  def change do
    create table(:files) do
      add :name, :string, null: false
      add :upload, :string, null: false
      add :user_id, references(:users)

      timestamps()
    end

    create index(:files, [:user_id])
    create unique_index(:files, [:name])
  end
end
