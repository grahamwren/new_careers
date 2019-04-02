defmodule NewCareersApi.AppsTest do
  use NewCareersApi.DataCase

  alias NewCareersApi.Apps

  describe "apps" do
    alias NewCareersApi.Apps.App

    @valid_attrs %{status: 42}
    @update_attrs %{status: 43}
    @invalid_attrs %{status: nil}

    def app_fixture(attrs \\ %{}) do
      {:ok, app} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app()

      app
    end

    test "list_apps/0 returns all apps" do
      app = app_fixture()
      assert Apps.list_apps() == [app]
    end

    test "get_app!/1 returns the app with given id" do
      app = app_fixture()
      assert Apps.get_app!(app.id) == app
    end

    test "create_app/1 with valid data creates a app" do
      assert {:ok, %App{} = app} = Apps.create_app(@valid_attrs)
      assert app.status == 42
    end

    test "create_app/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app(@invalid_attrs)
    end

    test "update_app/2 with valid data updates the app" do
      app = app_fixture()
      assert {:ok, %App{} = app} = Apps.update_app(app, @update_attrs)
      assert app.status == 43
    end

    test "update_app/2 with invalid data returns error changeset" do
      app = app_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app(app, @invalid_attrs)
      assert app == Apps.get_app!(app.id)
    end

    test "delete_app/1 deletes the app" do
      app = app_fixture()
      assert {:ok, %App{}} = Apps.delete_app(app)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app!(app.id) end
    end

    test "change_app/1 returns a app changeset" do
      app = app_fixture()
      assert %Ecto.Changeset{} = Apps.change_app(app)
    end
  end
end
