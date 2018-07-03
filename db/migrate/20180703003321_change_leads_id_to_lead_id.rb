class ChangeLeadsIdToLeadId < ActiveRecord::Migration[5.0]
  def change
    rename_column :outreaches, :leads_id, :lead_id
  end
end
