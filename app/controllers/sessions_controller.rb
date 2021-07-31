class SessionsController < ApplicationController
  def new;end

  def create
    user = User.find_by!(username: params[:username])

    return render json: { error: 'Invalid login credentials ' }, status: :not_found if user.nil?

    if user&.authenticate(params[:password])
      log_in(user)

      return render json: { data: user }, status: :ok
    end

    render json: { error: user.errors } , status: :unprocessable_entity
  end

  def destroy
    log_out if logged_in?
    render json: {}, status: :ok
  end
end
