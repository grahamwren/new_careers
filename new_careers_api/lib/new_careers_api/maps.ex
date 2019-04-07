defmodule NewCareersApi.Maps do

  def get_place_maps_url(input) do
    {:ok, _} = HTTPoison.start

    input
    |> get_places_search_url
    |> HTTPoison.get!
    |> handle_place_search_resp
  end

  defp handle_place_search_resp(response) do
    {:ok, body} = Jason.decode(response.body)
    if body["status"] === "ZERO_RESULTS" do
      {:error, "No results found for location"}
    else
      %{"place_id" => place_id} = hd body["candidates"]
      place_id
      |> get_places_details_url
      |> HTTPoison.get!
      |> handle_place_detail_resp
    end
  end

  defp handle_place_detail_resp(response) do
    {:ok, body} = Jason.decode(response.body)
    %{"status" => status, "result" => result} = body
    if status !== "OK" do
      {:error, "Place not found"}
    else
      {:ok, result["url"]}
    end
  end

  defp get_places_search_url(input) do
    base_url = Application.get_env(:new_careers_api, :google_maps_places_search_api_url)
    api_key = Application.get_env(:new_careers_api, :google_maps_api_key)

    base_url
    |> URI.parse
    |> Map.put(:query, URI.encode_query(
      input: input,
      inputtype: "textquery",
      languages: "en-us",
      key: api_key
    ))
    |> URI.to_string
  end

  defp get_places_details_url(place_id) do
    base_url = Application.get_env(:new_careers_api, :google_maps_places_detail_api_url)
    api_key = Application.get_env(:new_careers_api, :google_maps_api_key)

    base_url
    |> URI.parse
    |> Map.put(:query, URI.encode_query(
      placeid: place_id,
      fields: "name,url",
      key: api_key
    ))
    |> URI.to_string
  end
end