require "test_helper"

class EntryTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    
    @entry = @user.entries.build(entry_type: :clock_in, time: Time.now, )
  end

  test "should be valid" do
    assert @entry.valid?
  end

  test "user id should be present" do
    @entry.user_id = nil
    assert_not @entry.valid?
  end

  test "entry type should be present" do
    @entry.entry_type = " "
    assert_not @entry.valid?
  end

  test "clock in time should be present" do
    @entry.time = nil
    assert_not @entry.valid?
  end
end
