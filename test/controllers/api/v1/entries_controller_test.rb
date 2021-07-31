require "test_helper"

class Api::V1::EntriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @entry = @user.entries.first
  end

  def log_in_as(user)
    post login_url, params: { username: user.username, password: '123456' }
  end

  test "should fail when index is accessed by unauthorized user" do
    get api_v1_entries_url

    assert_response :unauthorized
    refute_includes @user.entries, @response.body
  end

  test "should fetch all user entries" do
    log_in_as(users(:one))

    get api_v1_entries_url

    assert_response :success
  end

  test "should fail when create is accessed by unauthorized user" do
    post api_v1_entries_url, params: { entry: { user_id: @user_id, time: Time.now, entry_type: :clock_in } }

    assert_response :unauthorized
  end

  test "should create an entry" do
    log_in_as(users(:one))

    assert_difference 'Entry.count', 1 do
      post api_v1_entries_url, params: { entry: { user_id: @user_id, time: Time.now, entry_type: :clock_in } }
  
      assert_response :created
    end
  end

  test "should fail when update is accessed by unauthorized user" do
    put api_v1_entry_path(@entry)

    assert_response :unauthorized
  end

  test "should update an entry" do
    log_in_as(users(:one))

    put api_v1_entry_url(@entry), params: { entry: { id: @entry.id, entry_type: :clock_out} }

    assert_response :success
  end
end
