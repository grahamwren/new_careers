defmodule NewCareersApiWeb.UserSocket do
  use Phoenix.Socket

  alias NewCareersApi.Users

  ## Channels
  channel "room:*", NewCareersApiWeb.RoomChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"token" => token}, socket, _connect_info) do
    with {:ok, user_id} <- verify_token(token) do
      user = Users.get_user!(user_id)
      {:ok, assign(socket, :from_user, user)}
    end
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     NewCareersApiWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "user_socket:#{socket.assigns.from_user.id}"

  defp verify_token(token) do
    Phoenix.Token.verify(NewCareersApiWeb.Endpoint, "user_id", token, max_age: 86400)
  end
end
