defmodule NewCareersApiWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :new_careers_api

  # CORS stuff (only for localhost, prod uses nginx path routing)
  plug CORSPlug, [origin: "http://localhost:3000"]

  socket "/api/v1/socket", NewCareersApiWeb.UserSocket,
    websocket: true,
    longpoll: false

  plug Plug.Static,
    at: "/api/v1/uploads", from: Path.expand('./uploads'), gzip: true

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_new_careers_api_key",
    signing_salt: "01TkKXcF"

  plug NewCareersApiWeb.Router
end
