defmodule NewCareersApiWeb.RoomChannel do
  use NewCareersApiWeb, :channel
  alias NewCareersApi.Users
  alias NewCareersApi.Chats

  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  def join("room:" <> chat_id, _payload, socket) do
    from_user = socket.assigns.from_user
    with {:ok, chat} <- verify_chat(chat_id, from_user.id) do
      to_user =
        if(chat.first_user.id === from_user.id, do: chat.second_user.id, else: chat.first_user.id)
        |> Users.get_user!
      {:ok, socket |> assign(:to_user, to_user) |> assign(:chat, chat)}
    end
  end

  def handle_in("get_all_chats", _payload, socket) do
    from_user_id = socket.assigns.from_user.id
    {:reply, {:ok, %{data: Chats.list_chats_for_user(from_user_id)}}, socket}
  end

  def handle_in("get_chat", %{"user_id" => to_user_id}, socket) do
    from_user_id = socket.assigns.from_user.id
    {:reply, {:ok, Chats.get_chat(from_user_id, to_user_id)}, socket}
  end

  def handle_in("get_chat", _payload, socket) do
    if socket.assigns.chat,
       do: {:reply, {:ok, Chats.get_chat(socket.assigns.chat.id)}, socket},
       else: {:reply, {:error, "cannot get chat from lobby without user_id"}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("send", payload, socket) do
    if socket.assigns.from_user && socket.assigns.to_user do
      with {:ok, m} <- Chats.create_message(%{
        message: payload,
        from_id: socket.assigns.from_user.id,
        to_id: socket.assigns.to_user.id
      }) do
        m = Chats.add_users_to_message(m)
        broadcast socket, "new_message", m
        {:noreply, socket}
      else
        _ -> {:reply, {:error, "message failed"}, socket}
      end
    else
      {:reply, {:error, "cannot send in lobby"}, socket}
    end
  end

  defp verify_chat(chat_id, user_id) do
    chat = Chats.get_chat(chat_id)
    if chat.first_user.id == user_id || chat.second_user.id == user_id,
       do: {:ok, chat},
       else: {:error, %{reason: "unauthorized"}}
  end
end
