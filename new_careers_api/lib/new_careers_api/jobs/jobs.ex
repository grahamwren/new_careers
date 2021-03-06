defmodule NewCareersApi.Jobs do
  @moduledoc """
  The Jobs context.
  """

  import Ecto.Query, warn: false
  alias NewCareersApi.Repo

  alias NewCareersApi.Jobs.Job

  @doc """
  Returns the list of jobs.

  ## Examples

      iex> list_jobs()
      [%Job{}, ...]

  """
  def list_jobs do
    Repo.all(Job)
  end

  # TODO: do order_by and order_dir
  def search_jobs(text, order_by, order_dir, start_n, limit) do
    search_text = "%" <> sanitize_like_str(text) <> "%"

    {start_n, _} = if start_n && start_n !== "", do: Integer.parse(start_n), else: {0, nil}
    start_n = if start_n < 0, do: 0, else: start_n

    {limit, _} = if limit && limit !== "", do: Integer.parse(limit), else: {100, nil}
    limit = if limit > 100 || limit < 0, do: 100, else: limit

    order_dir = if Enum.member?(["asc", "desc"], order_dir),
                   do: String.to_atom(order_dir),
                   else: :desc

    order_by = if order_by, do: String.to_atom(order_by), else: :""
    order_by = if Map.has_key?(%Job{}, order_by), do: order_by, else: :title

    Repo.all(from job in Job,
                    where: ilike(job.title, ^search_text) or
                           ilike(job.description, ^search_text) or
                           ilike(job.company, ^search_text) or
                           ilike(job.location, ^search_text),
                    order_by: [{^order_dir, field(job, ^order_by)}],
                    offset: ^start_n,
                    limit: ^limit)
  end

  defp sanitize_like_str(str) do
    if str do
      # remove non word characters, allows: [a-zA-Z0-9_ .-]
      str = Regex.replace(~r/[^\w \.\-]/, str, "", global: true)
      # escape "_" and "\" to "\_" or "\_" because is significant in like expr
      Regex.replace(~r/([_\\])/, str, "\\\\\\1", global: true)
    else
      ""
    end
  end

  @doc """
  Gets a single job.

  Raises `Ecto.NoResultsError` if the Job does not exist.

  ## Examples

      iex> get_job!(123)
      %Job{}

      iex> get_job!(456)
      ** (Ecto.NoResultsError)

  """
  def get_job!(id), do: Repo.get!(Job, id)

  @doc """
  Creates a job.

  ## Examples

      iex> create_job(%{field: value})
      {:ok, %Job{}}

      iex> create_job(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job(attrs \\ %{}) do
    %Job{}
    |> Job.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a job.

  ## Examples

      iex> update_job(job, %{field: new_value})
      {:ok, %Job{}}

      iex> update_job(job, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_job(%Job{} = job, attrs) do
    job
    |> Job.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Job.

  ## Examples

      iex> delete_job(job)
      {:ok, %Job{}}

      iex> delete_job(job)
      {:error, %Ecto.Changeset{}}

  """
  def delete_job(%Job{} = job) do
    Repo.delete(job)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking job changes.

  ## Examples

      iex> change_job(job)
      %Ecto.Changeset{source: %Job{}}

  """
  def change_job(%Job{} = job) do
    Job.changeset(job, %{})
  end
end
