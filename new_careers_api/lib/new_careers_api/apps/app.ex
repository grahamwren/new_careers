defmodule NewCareersApi.Apps.App do
  use Ecto.Schema
  import Ecto.Changeset
  import EctoEnum

  defenum AppStatus, new: 0, interview: 1, rejected: 2, hired: 3

  schema "apps" do
    field :status, AppStatus, default: 0
    belongs_to :user, NewCareersApi.Users.User
    belongs_to :job, NewCareersApi.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(app, attrs) do
    app
    |> cast(attrs, [:status, :user_id, :job_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:job_id)
    |> unique_constraint(:app, name: :one_app_per_user_per_job)
    |> validate_required([:status, :user_id, :job_id])
  end
end
