defmodule NewCareersApi.Repo do
  use Ecto.Repo,
    otp_app: :new_careers_api,
    adapter: Ecto.Adapters.Postgres
end
