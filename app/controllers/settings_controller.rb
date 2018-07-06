class SettingsController < ApplicationController
  before_action :check_for_settings, only: [:edit]

  def update
    @setting = Setting.find_by(id: params[:id])
    if @setting.update(setting_params)
      flash[:success] = "Updated!"
      redirect_to '/'
    else
      flash[:error] = "ERROR: We could not update this setting."
      render :next
    end
  end

  def edit
    @setting = @admin.setting
  end

private

  def check_for_settings
    @admin = Admin.find_by(id: params[:id])
    @admin.setting.nil? ? @admin.create_setting() : @admin.setting
  end
  
  def setting_params
    params.require(:setting).permit(:auto_text)
  end
end