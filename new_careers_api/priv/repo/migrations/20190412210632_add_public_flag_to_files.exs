defmodule NewCareersApi.Repo.Migrations.AddPublicFlagToFiles do
  use Ecto.Migration

  def change do
    alter table(:files) do
      add :public, :boolean, null: false, default: false
    end
  end
end
