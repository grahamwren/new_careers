defmodule NewCareersApi.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :from_id, references(:users, on_delete: :nothing)
      add :to_id, references(:users, on_delete: :nothing)
      add :message, :text
      timestamps()
    end
    create index(:messages, [:from_id])
    create index(:messages, [:to_id])
  end
end
