class Api::V1::EntriesController < ApplicationController
  before_action :logged_in_user, only: %i[index create update clock_out]

  def index
    entries = current_user&.entries&.order(created_at: :desc)
    render json: { data: entries }
  end

  def create
    entry = current_user&.entries.build(entry_params)
    if entry.save!
      render json: { data: entry }, status: :created
    else
      render json: { error: entry.errors } , status: :unprocessable_entity
    end
  end

  def update
    entry = find_entry

    if entry.update(entry_params)
      render json: { data: entry }, status: :ok
    else
      render json: { error: entry.errors } , status: :unprocessable_entity
    end
  end

  private

  def find_entry
    current_user.entries.find(params[:id])
  end

  def entry_params
    params.require(:entry).permit(:id, :time, :entry_type, :user_id, :created_at, :updated_at)
  end
end
