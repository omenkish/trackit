class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      log_in(user)
      return render json: { data: user }, status: :created
    end

    render json: { error: user.errors }, status: :unprocessable_entity
  end

  private

    def user_params
      params.require(:user).permit(:password,:password_confirmation, :username)
    end
end
