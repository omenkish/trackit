class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  #Confirms a logged-in user.
  def logged_in_user
    unless logged_in?
      render json: { error: 'Log in to access this page'}, status: :unauthorized
    end
  end
end
