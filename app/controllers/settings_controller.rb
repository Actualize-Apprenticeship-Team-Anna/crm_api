class SettingsController < ApplicationController
  def update
    @admin = Admin.find_by(id: params[:id])
    @setting = Setting.new(
      admin_id: @admin.id,
      auto_text: params[:auto_text]
    )
    @setting.save
  end

  def edit
    @admin = Admin.find_by(id: params[:id])
  end
end
