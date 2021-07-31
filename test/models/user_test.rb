require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(username: "Example User",
                    password: "foobar",
                    password_confirmation: "foobar")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "username should be present" do
    @user.username = "   "
    assert_not @user.valid?
  end

  test "password should be present" do
    @user.password = "  "
    assert_not @user.valid?
  end

  test "password should not be too short" do
    @user.password = "a" * 4
    assert_not @user.valid?
  end

  test "username should be unique" do
    @user.save
    duplicate_user = @user.dup
    duplicate_user.username = @user.username
    @user.save
    assert_not duplicate_user.valid?
  end
end
