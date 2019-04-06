defmodule NewCareersApi.Chats do
  @moduledoc """
  The Chats context.
  """

  import Ecto.Query, warn: false
  alias NewCareersApi.Repo
  alias NewCareersApi.Users.User
  alias NewCareersApi.Chats.Chat
  alias NewCareersApi.Chats.Message

  def get_chat(id) do
    {:ok, str} = Base.url_decode64(id)
    [u1, u2] = String.split(str, ":")
    get_chat(u1, u2)
  end

  def get_chat(u_id_1, u_id_2),
      do: get_chat(u_id_1, u_id_2, get_messages_between_users(u_id_1, u_id_2))

  def get_chat(u_id_1, u_id_2, messages) do
    [first_user_id, second_user_id] = Enum.sort([u_id_1, u_id_2])
    %Chat{
      id: Base.url_encode64("#{first_user_id}:#{second_user_id}"),
      messages: messages,
      first_user: Repo.get(User, first_user_id),
      first_user_id:  first_user_id,
      second_user: Repo.get(User, second_user_id),
      second_user_id: second_user_id
    }
  end

  def get_messages_for_chat(%Chat{first_user_id: first_id, second_user_id: second_id}),
      do: get_messages_between_users(first_id, second_id)
          |> add_users_to_messages

  def list_chats_for_user(user_id, with_messages? \\ false) do
    user_id
    |> get_messages_for_user
    |> add_users_to_messages
    |> Enum.sort_by(&get_chunk_str(&1))
    |> Enum.chunk_by(&get_chunk_str(&1))
    |> Enum.map(fn [h | t] -> get_chat(h.from_id, h.to_id, [h | t]) end)
  end

  def create_message(attrs) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert
  end

  def add_users_to_message(message), do: add_users_to_messages(message)
  def add_users_to_messages(messages) do
    messages
    |> Repo.preload(:from)
    |> Repo.preload(:to)
  end

  defp get_messages_for_user(user_id),
    do: Repo.all(from m in Message, where: m.from_id == ^user_id or m.to_id == ^user_id)
        |> add_users_to_messages

  defp get_messages_between_users(first_user_id, second_user_id),
       do: Repo.all(from m in Message,
                    where: m.from_id == ^first_user_id and m.to_id == ^second_user_id,
                    or_where: m.from_id == ^second_user_id and m.to_id == ^first_user_id)
           |> add_users_to_messages

  defp get_chunk_str(m),
       do: if m.from_id < m.to_id,
              do: "#{m.from_id}:#{m.to_id}",
              else: "#{m.to_id}:#{m.from_id}"
end