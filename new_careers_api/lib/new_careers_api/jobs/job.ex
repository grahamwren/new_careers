defmodule NewCareersApi.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset
  import EctoEnum

  alias NewCareersApi.Maps

  defenum SalaryType, hourly: 0, stipend: 1, unpaid: 2

  schema "jobs" do
    field :title, :string
    field :description, :string
    field :company, :string
    field :location, :string
    field :maps_url, :string
    field :salary, :integer
    field :salary_type, SalaryType

    belongs_to :contact, NewCareersApi.Users.User

    has_many :apps, NewCareersApi.Apps.App

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [
      :title,
      :description,
      :company,
      :location, # changeset intentionally does not allow manual updates to maps_url
      :contact_id,
      :salary,
      :salary_type
    ])
    |> get_maps_url
    |> foreign_key_constraint(:contact_id)
    |> validate_required([:title, :description, :company, :location, :contact_id, :salary_type])
  end

  defp get_maps_url(%Ecto.Changeset{valid?: true, changes: %{location: location}} = changeset) do
    case Maps.get_place_maps_url(location) do
      {:ok, url} -> change(changeset, %{maps_url: url})
      _ -> changeset
    end
  end
  defp get_maps_url(%Ecto.Changeset{valid?: true, data: %{location: location, maps_url: maps_url}} = changeset) do
    if (location && !maps_url) do
      case Maps.get_place_maps_url(location) do
        {:ok, url} -> change(changeset, %{maps_url: url})
        _ -> changeset
      end
    end
  end
  defp get_maps_url(changeset), do: changeset
end
