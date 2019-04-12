defmodule NewCareersApi.Files.File do
  use Ecto.Schema
  import Ecto.Changeset
  use Arc.Ecto.Schema

  schema "files" do
    field :name, :string
    field :public, :boolean
    field :upload, NewCareersApi.Upload.Type
    belongs_to :user, NewCareersApi.Users.User

    timestamps()
  end

  @doc false
  def changeset(file, attrs) do
    file
    |> cast(attrs, [:name, :user_id, :public])
    |> unique_constraint(:name)
    |> cast_attachments(attrs, [:upload])
    |> validate_required([:name, :upload, :user_id])
  end
end
