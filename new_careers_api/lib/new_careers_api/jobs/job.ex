defmodule NewCareersApi.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset
  import EctoEnum

  defenum SalaryType, hourly: 0, stipend: 1, unpaid: 2

  schema "jobs" do
    field :title, :string
    field :description, :string
    field :company, :string
    field :location, :string
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
      :location,
      :contact_id,
      :salary,
      :salary_type
    ])
    |> foreign_key_constraint(:contact_id)
    |> validate_required([:title, :description, :company, :location, :contact_id, :salary_type])
  end
end
