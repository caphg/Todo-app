json.array!(@items) do |item|
  json.extract! item, :id, :name, :due_date, :priority, :done, :description
  json.url item_url(item, format: :json)
end
