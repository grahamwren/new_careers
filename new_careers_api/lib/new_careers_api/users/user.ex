defmodule NewCareersApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :email, :name]}
  schema "users" do
    field :email, :string
    field :name, :string
    field :cover_letter, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    has_many :jobs, NewCareersApi.Jobs.Job, foreign_key: :contact_id
    has_many :apps, NewCareersApi.Apps.App
    has_many :files, NewCareersApi.Files.File

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :cover_letter, :password])
    |> put_pass_hash
    |> unique_constraint(:email)
    |> validate_required([:email, :password_hash])
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Argon2.add_hash(password))
  end
  defp put_pass_hash(changeset), do: changeset
end
