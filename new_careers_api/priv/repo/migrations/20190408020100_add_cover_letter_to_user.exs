defmodule NewCareersApi.Repo.Migrations.AddCoverLetterToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :cover_letter, :text
    end
  end
end
