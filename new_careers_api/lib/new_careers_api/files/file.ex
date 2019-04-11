defmodule NewCareersApi.Files.File do
  use Ecto.Schema
  import Ecto.Changeset
  use Arc.Ecto.Schema

  schema "files" do
    field :name, :string
    field :upload, NewCareersApi.Upload.Type
    belongs_to :user, NewCareersApi.Users.User

    timestamps()
  end

  @doc false
  def changeset(file, attrs) do
    file
    |> cast(attrs, [:name, :user_id])
    |> cast_attachments(attrs, [:upload])
    |> unique_constraint(:name)
    |> validate_required([:name, :upload, :user_id])
  end
end
