defmodule NewCareersApi.Chats.Message do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :message, :from_id, :to_id, :from, :to]}
  schema "messages" do
    field :message, :string
    belongs_to :from, NewCareersApi.Users.User
    belongs_to :to, NewCareersApi.Users.User
    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:from_id, :to_id, :message])
    |> foreign_key_constraint(:from_id)
    |> foreign_key_constraint(:to_id)
    |> validate_required([:from_id, :to_id, :message])
  end
end
