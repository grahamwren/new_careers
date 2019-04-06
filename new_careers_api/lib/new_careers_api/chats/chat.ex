defmodule NewCareersApi.Chats.Chat do
  @derive Jason.Encoder
  defstruct [
    :id,
    :first_user_id,
    :first_user,
    :second_user_id,
    :second_user,
    :messages
  ]
end